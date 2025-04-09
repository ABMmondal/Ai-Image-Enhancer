import axios from "axios";

const API_KEY = "wxyoeue56h3ze9tmt";
const Base_url = "https://techhk.aoscdn.com";

export const enhancedImageAPI = async (file) => {
  try {
    //1st step is to upload image and get taskId
    const taskId = await UploadImage(file);
    console.log("taskId is:", taskId);

    //2nd step: get enhanced image URL using taskId
    const enhancedImageData = await pollForEnhancedImage(taskId);
    console.log("enhancedImageData is:", enhancedImageData);
    return enhancedImageData;
  } catch (error) {
    console.log("error is  :", error);
  }
};

const UploadImage = async (file) => {
  // this is 2nd stape to get enhanced taskId
  const formData = new FormData();
  formData.append("image_url", file);

  const { data } = await axios.post(
    ` ${Base_url}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": API_KEY,
      },
    }
  );
  if (!data?.data?.taskId) {
    throw new Error("Failed to upload image");
  }
  return data.data.taskId;
};

const fetchEnhancedImage = async (taskid) => {
  // this is 4th stape to get enhanced image URL
  const { data } = await axios.get(
    `${Base_url}/api/tasks/visual/scale/${taskid}`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  if (!data?.data?.image_url) {
    throw new Error("Failed to fetch enhanced image");
  }
  return data.data;
};


const pollForEnhancedImage = async (taskId,retries= 0) => {

const result = await fetchEnhancedImage(taskId);

if (result.state === 4) {
  console.log('processing...')

  if (retries < 5) {

    throw new Error('try later')

  }

  await new Promise(resolve => setTimeout(resolve, 5000))
  return pollForEnhancedImage(taskId, retries + 1)

}

console.log(result)

return result
}

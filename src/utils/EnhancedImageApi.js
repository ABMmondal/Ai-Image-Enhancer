import axios, { Axios } from "axios"


const API_KEY ="wxyoeue56h3ze9tmt"
const Base_url="https://techhk.aoscdn.com"

export const enhancedImageAPI = async (file) => {
    // code to all API amd get enhancedImage URL

    try {
        const taskId = await UploadImage(file)

        console.log("taskId is  :", taskId)

        const enhancedImageData =await fetchEnhancedImage(taskId)


        
    } catch (error) {
        console.log("error is  :", error)
    }
}

const UploadImage = async (file) => {
    const formData = new FormData()
    formData.append("image_url", file)


    const {data }= await axios.post(` ${Base_url}/api/tasks/visual/scale`,formData, {  
        headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": API_KEY,
        },
    })

    return data.taskId;

}

const fetchEnhancedImage = async (taskid) => {}
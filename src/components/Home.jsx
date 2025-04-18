import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { enhancedImageAPI } from '../utils/EnhancedImageApi'

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null)
    const [enhancedImage, setEnhancedImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const UploadImageHandler = async (file)=>{

        setUploadImage(URL.createObjectURL(file))

        setLoading(true)


        try {
            const enhancedURL=await enhancedImageAPI(file)


            setEnhancedImage(enhancedURL)
            setLoading(false)
             
        } catch (error) {
            
            console.log(error)
            alert("Error while enhancing image")
        }

    }

   
    return (
        <>
            <ImageUpload  UploadImageHandler={UploadImageHandler}/>
            <ImagePreview loading={loading} uploadImage={uploadImage} enhance={enhancedImage?.image} />

        </>
    )
}

export default Home
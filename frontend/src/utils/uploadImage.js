import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Assuming the response contains the image URL or relevant data
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export default uploadImage;
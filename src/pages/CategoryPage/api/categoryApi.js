import axiosInstance from "@/axiosSetup.js";

export const categoryApi = {
    getTitleById: async (id) => {
        try {
            const response = await axiosInstance.get(`/titles/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getEditionById: async (id) => {
        try {
            const response = await axiosInstance.get(`/editions/${id}`);
            return response.data
        } catch (e) {
            console.log(e)
        }
    },
    getBookById: async (id) => {
        try {
            const response = await axiosInstance.get(`/bookCopies/${id}`);
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

}
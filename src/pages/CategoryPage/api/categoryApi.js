import axiosInstance from "@/axiosSetup.js";

export const categoryApi = {
    getTitleById: async (id) => {
        try {
            const response = await axiosInstance.get(`/titles/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
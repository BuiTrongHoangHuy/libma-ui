import axiosInstance from "@/axiosSetup.js";


export const readerApi ={
    getAllReaders: async()=>{
        try{
            const response =await axiosInstance.get("/readers/list")
            return response.data
        }catch (error){
            console.log(error)
        }
    },
    addReader: async(userData) =>{
        try{
            const response = await axiosInstance.post("/readers/add", userData);
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    deleteReader: async(id) => {
        try{
            const respone = await axiosInstance.put(`/readers/delete/${id}`);
            return respone.data;
        }
        catch (error){
            console.log(error)
        }
    },
    updateReader: async(id, readerData) => {
        try {
            const response = await axiosInstance.put(`/readers/${id}`, readerData);
            return response.data; 
        } catch (error) {
            console.log(error);
        }
    },
    getReaderById: async(id) => {
        try {
            const response = await axiosInstance.get(`/readers/${id}`);
            return response.data; 
        } catch (error) {
            console.log(error);
        }
    }
}
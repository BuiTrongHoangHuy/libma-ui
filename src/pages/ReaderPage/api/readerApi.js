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
    deleteReader: async(email) => {
        try{
            const respone = await axiosInstance.put("/readers/delete", {email});
            return respone.data
        }
        catch (error){
            console.log(error)
        }
    }
}
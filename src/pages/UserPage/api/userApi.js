import axiosInstance from "@/axiosSetup.js";


export const userApi ={
    getAllUsers: async()=>{
        try{
            const response =await axiosInstance.get("/users/list")
            return response.data
        }catch (error){
            console.log(error)
        }
    },
    addUser: async(userData) =>{
        try{
            const response = await axiosInstance.post("/users/add", userData);
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
}
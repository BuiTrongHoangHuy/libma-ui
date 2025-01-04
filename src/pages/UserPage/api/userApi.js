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
    getUserById: async(id) => {
        try {
            const response = await axiosInstance.get(`/users/${id}`);
            return response.data; 
        } catch (error) {
            console.log(error);
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
    },
    deleteUser: async(email) => {
        try{
            const respone = await axiosInstance.put("/users/delete", {email});
            return respone.data
        }
        catch (error){
            console.log(error)
        }
    },
    updateUser: async(id, userData) => {
        try {
            const response = await axiosInstance.put(`/users/${id}`, userData);
            return response.data; 
        } catch (error) {
            console.log(error);
        }
    }
}
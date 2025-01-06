import axiosInstance from "@/axiosSetup.js";

export const loginApi = async ({email, password}) => {
    try {
        const res = await axiosInstance.post("/login", {
            email, password
        });
        return res;
    } catch (e) {
        console.log(e)
    }

};
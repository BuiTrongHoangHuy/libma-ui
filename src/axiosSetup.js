import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
        "content-type": "application/json",
    },
    withCredentials: true,
})

export default axiosInstance
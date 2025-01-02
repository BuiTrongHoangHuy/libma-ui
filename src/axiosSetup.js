import axios from "axios"
import config from "../config.js"

const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: 5000,
    headers: {
        "content-type": "application/json",
    },
})

export default axiosInstance
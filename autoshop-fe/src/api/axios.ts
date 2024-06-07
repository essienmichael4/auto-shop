import axios, { AxiosInstance } from "axios";

// export default axios.create({
//     baseURL: "http://localhost:5000/api/v1"
// })

export const axios_instance : AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1"
});

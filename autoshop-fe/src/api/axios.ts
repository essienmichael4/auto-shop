import axios, { AxiosInstance } from "axios";

export const axios_instance : AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1"
});

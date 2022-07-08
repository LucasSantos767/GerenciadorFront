import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})


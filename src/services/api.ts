import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (!config.headers) config.headers = {};
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro) {
    return Promise.reject(erro)
})

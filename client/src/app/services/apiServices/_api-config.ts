import { AxiosRequestConfig } from "axios";


export const apiConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_API_URL,
    responseType: "json"
}
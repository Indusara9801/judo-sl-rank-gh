import axios from "axios";
import { localStorageKeys } from "../constants";

const useAxios = () => {
    axios.interceptors.request.use(config => {
        const data = config.url.split('/');
        if (!data.includes('auth')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem(localStorageKeys.ACCESS_TOKEN)}`
        }
        return config;
    });
    axios.interceptors.response.use(async (config) => {
        
        return config;
    })
}

export default useAxios;
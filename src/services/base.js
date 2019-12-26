import axios from 'axios';
export const baseUrl = 'http://192.168.0.120:8001';
const baseService = axios.create({
    baseURL:baseUrl
});
export default baseService;

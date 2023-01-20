import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.233:3000',
    url: 'http://0.0.0.0:3000'
})
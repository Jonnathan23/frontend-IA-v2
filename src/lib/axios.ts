import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL
})

const apiHistory = axios.create({
    baseURL: import.meta.env.VITE_API_HISTORY
})

export { api, apiHistory }
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL
})

const apiHistory = axios.create({
    baseURL: import.meta.env.VITE_API_HISTORY
})

const apiGoogle = axios.create({
    baseURL: 'https://texttospeech.googleapis.com/v1'
})
export { api, apiHistory, apiGoogle }
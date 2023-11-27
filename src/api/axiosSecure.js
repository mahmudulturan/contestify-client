import axios from 'axios'

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
})

export const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
})
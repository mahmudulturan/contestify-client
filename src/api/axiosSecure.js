import axios from 'axios'

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

export const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
})
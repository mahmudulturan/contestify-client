import axios from 'axios'
import { signOut } from 'firebase/auth';
import auth from '../config/firebase.config';

export const axiosSecure = axios.create({
    baseURL: "https://b8a12-server-side-mahmudulturan.vercel.app",
    withCredentials: true,
})
axiosSecure.interceptors.response.use(
    response => {
        return response
    },
    async err => {
        if (err.response && err.response.status == 401 || err.response.status == 403) {
            // await signOut(auth)
        }
    }
)

export const axiosPublic = axios.create({
    baseURL: "https://b8a12-server-side-mahmudulturan.vercel.app",
})
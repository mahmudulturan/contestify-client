import axios from 'axios'
import { signOut } from 'firebase/auth';
import auth from '../config/firebase.config';

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})
axiosSecure.interceptors.response.use(
    response => {
        return response
    },
    async err =>{
        if(err.response && err.response.status == 401 || err.response.status == 403){
           await signOut(auth)
           window.location.replace('/login')
        }
    }
)

export const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
})
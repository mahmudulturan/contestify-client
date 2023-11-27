import { axiosSecure } from "./axiosSecure"


export const saveUser = async (user) => {
    const userData = { email: user.email, name: user.displayName, image: user.photoURL, role: "user", userDate: new Date().toLocaleString()}
    const {data} = await axiosSecure.put('/users', userData)
    return data;
}
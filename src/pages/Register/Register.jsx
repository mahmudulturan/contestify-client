import Container from "../../components/Shared/Container/Container";
import LoginAnimation from '../../assets/Animations/LoginAnimation.json';
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import Button from "../../components/Shared/Button/Button";
import { Link } from "react-router-dom";
import { useState } from 'react'
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinnerTwo } from "react-icons/cg";




const Register = () => {
    const [uploadImage, setUploadImage] = useState()
    const [hidePassword, setHidePassword] = useState(true)
    const { createUser, updateUsersProfile, setLoading, loading } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        try {
            const { data: imageData } = await imageUpload(uploadImage)
            const image = imageData.display_url;
            const userData = { email, password, name, image }
            const { user } = await createUser(email, password)
            await updateUsersProfile(name, image)
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="pt-12 px-2 md:px-0">
            <Container>
                <div className="flex flex-col-reverse md:flex-row justify-center md:items-center gap-6">
                    <div className="flex-1">
                        <h3 className="text-center text-3xl md:text-5xl text-white font-bold my-6 uppercase">Sign Up Today!</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="name" className="block text-white text-xl my-2">Name</label>
                                <input {...register("name", { required: true })} type="text" name="name" id="name" placeholder="Your Name" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.name && <span className="text-red-400 mt-2 font-medium">You must have to input an name...</span>}
                            </div>
                            <div>
                                <label htmlFor="myemail" className="block text-white text-xl my-2">Email</label>
                                <input {...register("email", { required: true })} type="email" name="email" id="myemail" placeholder="Email Address" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.email && <span className="text-red-400 mt-2 font-medium">You must have to input an email...</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white text-xl my-2">Password</label>
                                <div className="relative">
                                    <input {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                        type={`${hidePassword ? "password" : "text"}`}
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        className="px-3 py-3 rounded-md outline-none w-full" />
                                    {errors.password?.type == "required" && <span className="text-red-400 mt-2 font-medium">You must have to type your password...</span>}
                                    {errors.password?.type == "minLength" && <span className="text-red-400 mt-2 font-medium">Password should have minimum 6 characters...</span>}
                                    {errors.password?.type == "maxLength" && <span className="text-red-400 mt-2 font-medium">Password should have maxiumum 20 characters...</span>}
                                    {errors.password?.type == "pattern" && <span className="text-red-400 mt-2 font-medium">Password should have minimum one lowercase, uppercase, special characters and number...</span>}
                                    <span onClick={() => setHidePassword(!hidePassword)} className="absolute right-3 top-3 h-full text-2xl cursor-pointer">{
                                        hidePassword ?
                                            <FaEye />
                                            :
                                            <FaEyeSlash />
                                    }</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-white text-xl my-2">Upload Photo</label>
                                <div className="text-center">
                                    <label>
                                        <div className="px-3 py-3 rounded-md outline-none w-full bg-white border border-gray-300 font-semibold cursor-pointer p-1 text-center ">
                                            <h3 className="flex items-center justify-center gap-2">
                                                <MdOutlineFileUpload className="text-2xl" />  {uploadImage?.name || "Upload A Image Of You"}
                                            </h3>
                                        </div>
                                        <input {...register("image", { required: true })} onChange={(e) => setUploadImage(e.target.files[0])} type="file" name="image" id="image" accept="image/*" className="text-sm cursor-pointer w-36 hidden" hidden />
                                    </label>
                                    {errors.image && <span className="text-red-400 mt-2 font-medium">You must have to upload an image...</span>}
                                </div>
                            </div>
                            <div className="text-center my-3">
                                {
                                    loading?
                                        <Button wfull={true} icon={CgSpinnerTwo} spin={true} transparent={true} disable={false}></Button>
                                        :
                                        <Button wfull={true} name="Register"></Button>
                                }
                            </div>
                        </form>
                        <div>
                            <p className="text-white text-right my-2">Already have an account? <Link to="/login" className="text-primaryCol underline">Login Here</Link></p>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                    <div className="flex-1">
                        <Lottie animationData={LoginAnimation} loop={true} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Register;
import Container from "../../components/Shared/Container/Container";
import LoginAnimation from '../../assets/Animations/LoginAnimation.json';
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import Button from "../../components/Shared/Button/Button";
import { Link } from "react-router-dom";
import { useState } from 'react'
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
    const [uploadImageText, setUploadImageText] = useState("Upload A Image Of You")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        console.log(data);
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
                                {errors.name && <span className="text-red-400 mt-2 font-medium">You must have to input an email...</span>}
                            </div>
                            <div>
                                <label htmlFor="myemail" className="block text-white text-xl my-2">Email</label>
                                <input {...register("email", { required: true })} type="email" name="email" id="myemail" placeholder="Email Address" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.email && <span className="text-red-400 mt-2 font-medium">You must have to input an email...</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white text-xl my-2">Password</label>
                                <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="Your Password" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.password && <span className="text-red-400 mt-2 font-medium">You must have to type your password...</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white text-xl my-2">Upload Photo</label>
                                <div className="text-center">
                                    <label>
                                        <div className="px-3 py-3 rounded-md outline-none w-full bg-white border border-gray-300 font-semibold cursor-pointer p-1' ">
                                            {uploadImageText}
                                        </div>
                                        <input {...register("image")} onChange={(e) => setUploadImageText(e.target.files[0].name)} type="file" name="image" id="image" accept="image/*" className="text-sm cursor-pointer w-36 hidden" hidden />
                                    </label>
                                </div>
                            </div>
                            <div className="text-center my-3">
                                <Button wfull={true} name="Register"></Button>
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
import Container from "../../components/Shared/Container/Container";
import LoginAnimation from '../../assets/Animations/LoginAnimation.json';
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import Button from "../../components/Shared/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinnerTwo } from "react-icons/cg";
import toast from "react-hot-toast";



const Login = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const { loginUser, loading, user } = useAuth()
    const navigate = useNavigate()
    const loc = useLocation()
    if (user) {
        navigate(loc.state?.from?.pathname || "/", { replace: true })
    }

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await loginUser(email, password);
        toast.success('Successfully Login')
        navigate(loc.state?.from?.pathname || "/", { replace: true })
    }
    return (
        <div className="pt-12 px-2 md:px-0">
            <Container>
                <div className="flex flex-col-reverse md:flex-row justify-center md:items-center gap-6">
                    <div className="flex-1">
                        <h3 className="text-center text-3xl md:text-5xl text-white font-bold my-6 uppercase">Log In Here</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="myemail" className="block text-white text-xl my-2">Email</label>
                                <input {...register("email", { required: true })} type="email" name="email" id="myemail" placeholder="Email Address" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.email && <span className="text-red-400 mt-2 font-medium">You must have to input an email...</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-white text-xl my-2">Password</label>
                                <div className="relative">
                                    <input {...register("password", { required: true })} type={`${hidePassword ? "password" : "text"}`} name="password" id="password" placeholder="Your Password" className="px-3 py-3 rounded-md outline-none w-full" />
                                    {errors.password && <span className="text-red-400 mt-2 font-medium">You must have to type your password...</span>}
                                    <span onClick={() => setHidePassword(!hidePassword)} className="absolute right-3 top-3 h-full text-2xl cursor-pointer">{
                                        hidePassword ?
                                            <FaEye />
                                            :
                                            <FaEyeSlash />
                                    }</span>
                                </div>
                            </div>
                            <div className="text-left text-sm cursor-pointer mt-1 mb-3 mr-2 text-white underline">
                                <span>Forgot Password?</span>
                            </div>
                            <div className="text-center my-2">
                                {
                                    loading ?
                                        <Button wfull={true} icon={CgSpinnerTwo} spin={true} transparent={true} disable={true}></Button>
                                        :
                                        <Button wfull={true} name="Login"></Button>
                                }
                            </div>
                        </form>
                        <div>
                            <p className="text-white text-right my-2">Don`t have any account? <Link state={loc?.state} replace to="/register" className="text-primaryCol underline">Register Here</Link></p>
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

export default Login;
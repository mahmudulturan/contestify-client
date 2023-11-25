import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth()

  const handleSocialLogin = async(method)=>{
    await method()
  }

  return (
   <div className="text-center">
    <div className="text-xl text-white">
        <span className="text-sm">Or </span><br /> Continue With
    </div>
    <div className="flex gap-4 my-2 text-white justify-center">
    <button onClick={()=>handleSocialLogin(googleLogin)} className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaGoogle /></button>
    <button className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaFacebook /></button>
    </div>
   </div>
  );
};

export default SocialLogin;
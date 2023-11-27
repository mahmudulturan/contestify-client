import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleLogin } = useAuth()
  const navigate = useNavigate()
  const loc = useLocation();

  const handleSocialLogin = async (method) => {
    const { user } = await method()
    const result = await saveUser(user)
    if (result.acknowledged) {
      toast.success('Successfully Registered')
    }
    else if (result.status == "User Found") {
      toast.success('Successfully Login')
    }
    navigate(loc.state?.from?.pathname || "/")
    console.log(result);
  }

  return (
    <div className="text-center">
      <div className="text-xl text-white">
        <span className="text-sm">Or </span><br /> Continue With
      </div>
      <div className="flex gap-4 my-2 text-white justify-center">
        <button onClick={() => handleSocialLogin(googleLogin)} className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaGoogle /></button>
        <button className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaFacebook /></button>
      </div>
    </div>
  );
};

export default SocialLogin;
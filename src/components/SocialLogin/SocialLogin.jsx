import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  return (
   <div className="text-center">
    <div className="text-xl text-white">
        <span className="text-sm">Or </span><br /> Continue With
    </div>
    <div className="flex gap-4 my-2 text-white justify-center">
    <button className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaGoogle /></button>
    <button className="text-3xl py-2 px-2 bg-primaryCol rounded-full"><FaFacebook /></button>
    </div>
   </div>
  );
};

export default SocialLogin;
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../api/axiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
    const {user : currentUser, loading} = useAuth();
    
    const {data : user, refetch, isLoading: roleLoading} = useQuery({queryKey: ["my-profile", currentUser?.email], enabled: !loading || currentUser,   queryFn: async()=>{

      const res = await axiosSecure.get(`/users/${currentUser?.email}`)
      return res.data
    }})
   
  return {user, role: user?.role, refetch, roleLoading}
};

export default useUser;
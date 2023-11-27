import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../api/axiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
    const {user : currentUser} = useAuth();
    const {data : user, refetch} = useQuery({queryKey: ["my-profile", currentUser?.email], queryFn: async()=>{
        const res = await axiosSecure.get(`/users/${currentUser?.email}`)
        return res.data
    }})
  return {user, role: user?.role, refetch}
};

export default useUser;
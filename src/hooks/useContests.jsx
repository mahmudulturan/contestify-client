import { useQuery } from "@tanstack/react-query";
import queryString from 'query-string';
import { useSearchParams } from "react-router-dom";
import { axiosPublic } from "../api/axiosSecure";


const useContests = () => {
    const [params, setParams] = useSearchParams();
    const query = queryString.parse(params.toString())
    let url = "/contests"
    if(params.size>0){
      url = `/contests?tags=${query.tags}`
    }
    
    const {data, isLoading} = useQuery({queryKey: ["contests", url], queryFn: async()=>{
        const res = await axiosPublic.get(url)
        return res.data;
    }})
  return {data, isLoading};
};

export default useContests;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import queryString from 'query-string';
import { useSearchParams } from "react-router-dom";


const useContests = () => {
    const axios = useAxiosPublic()    
    const [params, setParams] = useSearchParams();
    const query = queryString.parse(params.toString())
    let url = "/contests"
    if(params.size>0){
      url = `/contests?tags=${query.tags}`
    }
    
    const {data, isLoading} = useQuery({queryKey: ["contests", url], queryFn: async()=>{
        const res = await axios.get(url)
        return res.data;
    }})
  return {data, isLoading};
};

export default useContests;
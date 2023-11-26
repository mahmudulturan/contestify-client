import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import queryString from 'query-string';
import { useSearchParams } from "react-router-dom";


const useContests = () => {
    const axios = useAxiosPublic()    
    const [params, setParams] = useSearchParams();
    const query = queryString.parse(params.toString())
    const url = `/contests?tags=${query.tags}`
    
    const {data} = useQuery({queryKey: ["contests", url], queryFn: async()=>{
        const res = await axios.get(url)
        return res.data;
    }})
  return {data};
};

export default useContests;
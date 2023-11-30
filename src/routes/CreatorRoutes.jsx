import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


const CreatorRoutes = ({children}) => {
    const {loading} = useAuth()
    const {role, roleLoading} = useUser();
    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if (role === "creator" || role === "admin"){
        return children
    }
  return <Navigate to='/dashboard'></Navigate>
};
CreatorRoutes.propTypes = {
    children: PropTypes.node
}

export default CreatorRoutes;
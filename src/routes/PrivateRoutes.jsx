import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const loc = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
  return <Navigate to="/login" state={{from: loc}} replace={true}></Navigate>
};

PrivateRoutes.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoutes;
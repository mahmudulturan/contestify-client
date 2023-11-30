import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


const AdminRoutes = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useUser();
    if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if (role === "admin") {
        return children
    }
    else {
        return <Navigate to='/dashboard'></Navigate>
    }
};
AdminRoutes.propTypes = {
    children: PropTypes.node
}

export default AdminRoutes;
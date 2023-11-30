import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetail from "../pages/ContestDetail/ContestDetail";
import MyProfile from "../pages/Dashboard/Shared/MyProfile/MyProfile";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import ContestManager from "../pages/Dashboard/Admin/ContestManager/ContestManager";
import UsersManager from "../pages/Dashboard/Admin/UsersManager/UsersManager";
import CreateContest from "../pages/Dashboard/ContestCreator/CreateContest/CreateContest";
import MyContests from "../pages/Dashboard/ContestCreator/MyContests/MyContests";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import JoinedContest from "../pages/Dashboard/User/JoinedContest/JoinedContest";
import WinningContest from "../pages/Dashboard/User/WinningContest/WinningContest";
import UpdateContest from "../pages/Dashboard/Shared/UpdateContest/UpdateContest";
import ContestSubmission from "../pages/Dashboard/ContestCreator/ContestSubmission/ContestSubmission";
import AdminRoutes from "./AdminRoutes";
import CreatorRoutes from "./CreatorRoutes";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const MainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-contest',
                element: <AllContest></AllContest>
            },
            {
                path: '/all-contest/:id',
                element: <PrivateRoutes><ContestDetail></ContestDetail></PrivateRoutes>
            },
            {
                path: '/constest/payment/:id',
                element: <PrivateRoutes><PaymentPage></PaymentPage></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },


            
        ],
        
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: 'my-profile',
                element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes> 
            },

            {
                path: 'joined-contests',
                element: <PrivateRoutes><JoinedContest></JoinedContest></PrivateRoutes> 
            },
            {
                path: 'winning-contests',
                element: <PrivateRoutes><WinningContest></WinningContest></PrivateRoutes> 
            },
            


            {
                path: 'create-contests',
                element: <CreatorRoutes><CreateContest></CreateContest> </CreatorRoutes>
            },
            {
                path: 'update-contests/:id',
                element: <CreatorRoutes><UpdateContest></UpdateContest></CreatorRoutes>
            },
            {
                path: 'my-contests',
                element: <CreatorRoutes><MyContests></MyContests></CreatorRoutes> 
            },
            {
                path: 'contest-submission/:id',
                element: <CreatorRoutes><ContestSubmission></ContestSubmission></CreatorRoutes> 
            },


            {
                path: 'manage-contests',
                element: <AdminRoutes><ContestManager></ContestManager></AdminRoutes> 
            },
            {
                path: 'manage-users',
                element: <AdminRoutes><UsersManager></UsersManager></AdminRoutes> 
            },
        ]
    }
])

export default MainRoutes;
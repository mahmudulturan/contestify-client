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

const MainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
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
                element: <MyProfile></MyProfile>
            },

            {
                path: 'joined-contests',
                element: <JoinedContest></JoinedContest>
            },
            {
                path: 'winning-contests',
                element: <WinningContest></WinningContest>
            },
            


            {
                path: 'create-contests',
                element: <CreateContest></CreateContest>
            },
            {
                path: 'my-contests',
                element: <MyContests></MyContests>
            },


            {
                path: 'manage-contests',
                element: <ContestManager></ContestManager>
            },
            {
                path: 'manage-users',
                element: <UsersManager></UsersManager>
            },
        ]
    }
])

export default MainRoutes;
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetail from "../pages/ContestDetail/ContestDetail";
import CreateContest from "../pages/ContestCreator/CreateContest/CreateContest";
import MyContests from "../pages/ContestCreator/MyContests/MyContests";

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
                element: <ContestDetail></ContestDetail>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/create-contests',
                element: <CreateContest></CreateContest>
            },
            {
                path: '/my-contests',
                element: <MyContests></MyContests>
            },
        ]
    }
])

export default MainRoutes;
import { Link, NavLink, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import Button from "../components/Shared/Button/Button";

const DashboardLayout = () => {
    const { role } = useUser()
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
        
    }


    return (
        <div className="bg-seconderyCol">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/12">
                    {/* sidebar section */}
                    <div className={`z-10 md:min-h-screen flex flex-col justify-between sticky top-0 w-full rounded-md py-2 px-4`}>
                        <div>
                            <h3 className='text-primaryCol font-semibold text-center text-lg'>{user?.displayName} <sup className='uppercase text-xs font-thin text-white'>{role}</sup></h3>
                            <div className='flex flex-col justify-between h-full gap-3 my-2'>
                                <Link to="/" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Home</Link>
                                {
                                    role == "user" && <>
                                        <NavLink to="/dashboard/joined-contests" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Joined Contests</NavLink>
                                        <NavLink to="/dashboard/winning-contests" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Winning Page</NavLink>
                                        <NavLink to="/dashboard/my-profile" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Profile</NavLink>
                                    </>
                                }
                                {
                                    role == "creator" && <>
                                        <NavLink to="/dashboard/create-contests" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Create Contest</NavLink>
                                        <NavLink to="/dashboard/my-contests" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>My Contests</NavLink>
                                        <NavLink to="/dashboard/my-profile" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Profile</NavLink>
                                    </>
                                }
                                {
                                    role == "admin" && <>
                                        <NavLink to="/dashboard/manage-contests" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Contest Manager</NavLink>
                                        <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>User Manager</NavLink>
                                        <NavLink to="/dashboard/my-profile" className={({ isActive }) =>
                                            isActive ? "bg-primaryCol font-semibold text-lg py-1 px-3 rounded-md text-white" : "text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md"}>Profile</NavLink>
                                    </>
                                }
                            </div>
                        </div>
                        <span onClick={handleLogOut}>
                            <Button wfull name="logout"></Button>
                        </span>
                    </div>
                </div>
                <div className="md:w-9/12 min-h-screen bg-bgCol">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
import { Link, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import {useState} from "react"
import useAuth from "../hooks/useAuth";
import Button from "../components/Shared/Button/Button";
import ContestManager from "../pages/Admin/ContestManager/ContestManager";

const DashboardLayout = () => {
    const {role} = useUser()
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()

    }


    return (
        <div className="bg-seconderyCol">
            <div className="flex flex-col md:flex-row relative ">
                <div className="md:w-3/12 min-h-screen">
                    <div className={`z-10 right-0 mt-2 sticky w-full ${isScrolling ? "bg-seconderyCol" : "bg-seconderyCol/10"} rounded-md py-2 px-4`}>
                        <h3 className='text-primaryCol font-semibold text-center text-lg'>{user?.displayName} <sup className='uppercase text-xs font-thin text-white'>{role}</sup></h3>
                        <div className='flex flex-col justify-between h-full gap-3 my-2'>
                            {
                                role == "user" && <>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/joined-contests" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Joined Contests</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/winning-contests" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Winning Page</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/my-profile" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Profile</Link>
                                </>
                            }
                            {
                                role == "creator" && <>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/create-contests" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Create Contest</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/my-contests" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>My Contests</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/my-profile" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Profile</Link>
                                </>
                            }
                            {
                                role == "admin" && <>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/manage-contests" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Contest Manager</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/manage-users" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>User Manager</Link>
                                    <Link onClick={() => setIsLoginOpen(false)} to="/dashboard/my-profile" className='text-white font-medium hover:bg-primaryCol transition duration-300 py-1 px-3 rounded-md'>Profile</Link>
                                </>
                            }
                            <span onClick={handleLogOut}>
                                <Button wfull name="logout"></Button>
                            </span>
                        </div>
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
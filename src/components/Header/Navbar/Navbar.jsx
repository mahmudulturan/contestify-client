import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo1 from '../../../assets/logo dark.png'
import { AiOutlineMenuFold, AiOutlineClose, AiOutlineLogin} from "react-icons/ai";
import NavItem from './NavItem';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = <>
        <div className="flex flex-col md:flex-row md:mx-6 md:gap-6 gap-2">
            <NavItem path='/' name="Home"></NavItem>
            <NavItem path='/all-contest' name="All Contest"></NavItem>
            <NavItem path='/popular-contest' name="Popular Contest"></NavItem>
            <NavItem path='/contact-us' name="Contact Us"></NavItem>
        </div>
    </>

    return (
        <div>
            <nav className="relative bg-transparent shadow">
                <div className="max-w-7xl py-6 px-1 mx-auto md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <Link>
                            <img className="w-auto h-6 sm:h-9" src={logo1} alt="" />
                        </Link>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                {!isOpen ? (
                                    <AiOutlineMenuFold className="w-6 h-6 text-textCol" />
                                ) : (
                                    <AiOutlineClose className="w-6 h-6 text-textCol" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-bgCol md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        {navLinks}
                        <div className="flex justify-center md:block my-3 md:my-0">
                                    <button className='py-2 md:py-3 px-4 md:px-6 md:ml-5 font-bold text-white transition duration-300 bg-primaryCol hover:bg-transparent border-2 border-primaryCol  rounded-xl text-lg'>Login <AiOutlineLogin className='inline text-2xl' /></button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
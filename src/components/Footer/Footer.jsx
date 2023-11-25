import logo1 from '../../assets/logo dark.png'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Button from '../Shared/Button/Button';
import Container from '../Shared/Container/Container';


const Footer = () => {
    return (
        <div>
            <Container minHeight={true} padding={true}>
                <footer className="bg-transparent px-2 md:px-0">
                    <div className="pt-6 pb-12 mx-auto">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                            <div className="sm:col-span-2">
                                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">Get updates. Subscribe now!</h1>

                                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                                    <input
                                        id="email"
                                        type="text"
                                        className="bg-transparent text-white outline-none focus:border-b-2 border-primaryCol"
                                        placeholder="Email Address"
                                    />

                                    <Button name="Subscribe" transparent={true}></Button>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Quick Link</p>

                                <div className="flex flex-col items-start mt-5 space-y-2">
                                    <a href="#" className="text-white transition-colors duration-300 hover:underline hover:text-primaryCol">Home</a>
                                    <a href="#" className="text-white transition-colors duration-300 hover:underline hover:text-primaryCol">All Contest</a>
                                    <a href="#" className="text-white transition-colors duration-300 hover:underline hover:text-primaryCol">Popular Contest</a>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Follow Us On</p>

                                <div className="flex flex-col items-start mt-5 space-y-2">
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <a href="" className='text-white text-2xl py-1 px-1 bg-primaryCol rounded-full'><FaFacebook /></a>
                                        <span className='font-medium text-white'>Facebook</span>
                                    </div>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <a href="" className='text-white text-2xl py-1 px-1 bg-primaryCol rounded-full'><FaInstagram /></a>
                                        <span className='font-medium text-white'>Instagram</span>
                                    </div>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <a href="" className='text-white text-2xl py-1 px-1 bg-primaryCol rounded-full'><FaLinkedin /></a>
                                        <span className='font-medium text-white'>Linkedin</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

                        <div className="flex items-center justify-between">
                            <a href="#">
                                <img className="w-auto h-7" src={logo1} alt="" />
                            </a>
                            <div className='text-white'>
                                © 2023 Contestify. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </Container>
        </div>
    );
};

export default Footer;
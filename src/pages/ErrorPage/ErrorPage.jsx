import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Animations/ErrorAnimation.json'
import { Link, useRouteError } from 'react-router-dom';
import Button from '../../components/Shared/Button/Button';

const ErrorPage = () => {
    const error = useRouteError();
    console.log();

    return (
        <div className='bg-bgCol'>
            <div className='flex items-center justify-center flex-col h-full min-h-screen py-12'>
                <h3 className='md:text-3xl font-medium text-center text-white'>{error?.error?.message}</h3>
                <div className='sm:w-96 h-96 mx-auto'>
                    <Lottie animationData={errorAnimation} loop={true} />
                </div>
                <div className='text-center md:my-3'>
                    <Link to='/'><Button name="Go Home"></Button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
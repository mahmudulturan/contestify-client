import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
const DeadlineCountdown = ({ deadline, setDeadlineOver }) => {
    const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const endTime = new Date(deadline).getTime();
        const timeRemaining = endTime - now;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
            if(timeRemaining.seconds<0){
                setDeadlineOver(true)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    return (
        <div>
            <div className='py-3 md:px-4 rounded-md bg-seconderyCol max-w-md text-center shadow-md'>
                {timeRemaining.seconds < 0 ?
                    <h4 className='font-medium text-2xl px-9'>Deadline is over</h4>
                    :
                    <div>
                        <h4 className='font-medium text-sm'>Deadline Closing On: {deadline}</h4>
                        <div className='flex gap-1 items-center justify-center'>
                            <span className='md:text-2xl font-medium'> {timeRemaining.days}</span> <span className='text-sm font-thin'>days</span>
                            <span className='md:text-2xl font-medium'> : {timeRemaining.hours}</span> <span className='text-sm font-thin'>hours</span>
                            <span className='md:text-2xl font-medium'> : {timeRemaining.minutes}</span> <span className='text-sm font-thin'>minutes</span>
                            <span className='md:text-2xl font-medium'> : {timeRemaining.seconds}</span> <span className='text-sm font-thin'>seconds</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

DeadlineCountdown.propTypes = {
    deadline: PropTypes.string,
    setDeadlineOver: PropTypes.any
}

export default DeadlineCountdown;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { axiosSecure } from '../../../../api/axiosSecure';
import toast from 'react-hot-toast';


const ParticipateModal = ({ contest, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState("");
    const now = new Date().getTime();
    const endTime = new Date(contest?.contest_deadline).getTime();
    const deadlineOver = now - endTime > 0;
    const handleParticipate = async () => {
        const res = await axiosSecure.post(`/participate-contest/${contest?._id}`, { task })
        if (res.data.modifiedCount) {
            toast.success('Successfully task submitted!')
            setIsOpen(false)
            refetch()
        }
    }

    return (
        <div className="relative flex justify-center">
            <button
                disabled={contest?.submitted_task || deadlineOver}
                onClick={() => setIsOpen(true)}
                className="text-sm mr-2 rounded-md border-2 border-primaryCol disabled:bg-transparent  hover:bg-transparent font-medium py-2 px-3 bg-primaryCol transition duration-300 focus:bg-transparent"
            >
                {
                    contest?.submitted_task ?
                        "Participated"
                        :
                        deadlineOver ?
                            "Deadline Over"
                            :
                            "Participate"
                }
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-10 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="flex items-end justify-center min-h-screen px-2 sm:px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                    >
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="relative inline-block px-2 sm:px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-cardCol sm:my-8 sm:align-middle sm:max-w-md w-full sm:w-full sm:p-6"
                        >
                            <div>
                                <img
                                    className="object-cover w-full h-48 rounded-md"
                                    src={contest?.contest_image}
                                    alt=""
                                />

                                <div className="mt-4 text-center">
                                    <h3 className="font-medium leading-6 text-white" id="">
                                        Participate for {contest?.contest_name}
                                    </h3>

                                    <p className="">
                                        <textarea onChange={(e) => setTask(e.target.value)} className='w-full text-white bg-seconderyCol/50 outline-none rounded-md py-2 px-3 my-3' name="" id="" cols="20" rows="10" placeholder='Provide your tasks here...'></textarea>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full px-4 py-2 text-sm  my-1 font-medium tracking-wide transition-colors duration-300 transform border rounded-md sm:w-1/2 sm:mx-2 text-gray-200 border-gray-700 bg-gray-800 focus:outline-none"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleParticipate}
                                    className="w-full text-sm rounded-md border-2 border-primaryCol hover:bg-transparent font-medium py-2 px-4 bg-primaryCol transition duration-300 my-1 "
                                >
                                    Participate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ParticipateModal.propTypes = {
    contest: PropTypes.object,
    refetch: PropTypes.object,
}

export default ParticipateModal;

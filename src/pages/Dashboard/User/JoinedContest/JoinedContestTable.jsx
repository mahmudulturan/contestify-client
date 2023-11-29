import PropTypes from 'prop-types';
import ParticipateModal from './ParticipateModal';

const JoinedContestTable = ({ joinedContests, handleUpcommingSort, refetch }) => {

    return (
        <>
            <h4 className="uppercase text-lg text-center text-primaryCol font-medium my-3">Total Joined Contest : {joinedContests?.length}</h4>
           <div className='text-center my-3'> <button onClick={handleUpcommingSort} className='bg-primaryCol border-2 border-primaryCol hover:bg-transparent transition duration-300 py-1 px-3 rounded-md text-white font-medium'>Upcomming Contest</button></div>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-seconderyCol py-6 px-5 rounded-md text-white font-medium shadow-md">
                        <tr>
                            <th className="py-4 px-4 text-base font-medium text-left">#</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Info</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Joined Date</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Deadline</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-seconderyCol/40 py-6 px-5 rounded-md text-white font-medium">
                        {
                            joinedContests?.map((contest, indx) => <tr key={contest._id}>
                                <td className="py-4 px-4 text-sm font-normal text-left">{indx + 1}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <div className='flex items-center justify-start gap-3'>
                                        <img className='w-16 h-16 object-cover rounded-md' src={contest?.contest_image} alt="" />
                                        <div>
                                            {contest?.contest_name} <span className="block text-xs">{contest?.contest_type}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.purchaseTime}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_deadline}</td>
                                <td className="py-4 px-4 text-sm font-normal">
                                    <button><ParticipateModal refetch={refetch} contest={contest}></ParticipateModal></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div></>
    );
};

JoinedContestTable.propTypes = {
    joinedContests: PropTypes.array,
    handleUpcommingSort: PropTypes.any,
    refetch: PropTypes.any
}

export default JoinedContestTable;
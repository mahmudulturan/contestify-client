import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import { axiosSecure } from "../../../../api/axiosSecure";

const ContestSubmissionTable = ({ allsubmission, refetch, winner }) => {
    const handleSelectWinner = (id, winner) => {
        Swal.fire({
            title: `Want to make him contest winner?`,
            text: `He will be the contest winner`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, Confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/select-winner/${id}`, winner)
                console.log(data);
                if (data?.modifiedCount > 0) {
                    Swal.fire({
                        title: `Sucessfully make him as winner`,
                        text: `Contest is over winner is declared`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }
    return (
        <>
            <h4 className="uppercase text-lg text-center text-primaryCol font-medium my-3">Total Submission Count : {allsubmission?.length}</h4>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-seconderyCol py-6 px-5 rounded-md text-white font-medium shadow-md">
                        <tr>
                            <th className="py-4 px-4 text-base font-medium text-left">#</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Contest Info</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Particpant Info</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Participate Time</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Submitted Task</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-seconderyCol/40 py-6 px-5 rounded-md text-white font-medium">
                        {
                            allsubmission?.map((contest, indx) => <tr key={contest._id}>
                                <td className="py-4 px-4 text-sm font-normal text-left">{indx + 1}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <div className='flex items-center justify-start gap-3'>
                                        <img className='w-16 h-16 object-cover rounded-md' src={contest?.contest_image} alt="" />
                                        <div>
                                            {contest?.contest_name} <span className="block text-xs">{contest?.contest_type}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <div className='flex items-center justify-start gap-3'>
                                        <img className='w-16 h-16 object-cover rounded-md' src={contest?.participator.image} alt="" />
                                        <div>
                                            {contest?.participator.name} <span className="block text-xs">{contest?.participator.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.purchaseTime}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left max-w-xs overflow-x-auto">{contest?.submitted_task || "Not Submit Yet"}</td>
                                <td className="py-4 px-4 text-sm font-normal flex items-center justify-start">
                                    <button disabled={winner || !contest?.submitted_task} onClick={() => handleSelectWinner(contest.contest_id, contest.participator)} className="py-1 px-3 font-medium border-2 border-primaryCol rounded-md bg-primaryCol hover:bg-transparent disabled:text-gray-500 transition disabled:bg-transparent duration-300 default:text-gray-600">{winner ? "Winner Declared" : !contest.submitted_task? "Task Missing" : "Select Winner"}</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

ContestSubmissionTable.propTypes = {
    allsubmission: PropTypes.array,
    refetch: PropTypes.func,
    winner: PropTypes.any,
}

export default ContestSubmissionTable;
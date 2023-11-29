import { MdDelete, MdEditDocument } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { axiosSecure } from "../../../../api/axiosSecure";

const MyContestsTable = ({ mycontests, refetch }) => {
    const handleDeleteContest = (id) => {
        Swal.fire({
            title: `Want to delete this contest?`,
            text: `Contest will remove from everywhere.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/contests/${id}`)
                if (data?.deletedCount > 0) {
                    Swal.fire({
                        title: `Sucessfully delete from contestify`,
                        text: `Contest will removed from everywhere`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }
    return (
        <>
            <h4 className="uppercase text-lg text-center text-primaryCol font-medium my-3">Total Added Contest : {mycontests.length}</h4>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-seconderyCol py-6 px-5 rounded-md text-white font-medium shadow-md">
                        <tr>
                            <th className="py-4 px-4 text-base font-medium text-left">#</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Name</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Status</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Participate Count</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Deadline</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Winner</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-seconderyCol/40 py-6 px-5 rounded-md text-white font-medium">
                        {
                            mycontests?.map((contest, indx) => <tr key={contest._id}>
                                <td className="py-4 px-4 text-sm font-normal text-left">{indx + 1}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.name} <span className="block text-xs">{contest?.contest_type}</span></td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.status || "pending"}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.participate_count}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_deadline}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.winner?.name || "Contest Running"} <span className="block text-xs">{contest?.winner?.email}</span></td>
                                <td className="py-4 px-4 text-sm font-normal flex items-center justify-start ">
                                    <button onClick={() => handleDeleteContest(contest._id)} disabled={contest.status == "accepted"} className="text-2xl mr-2 rounded-md hover:text-primaryCol disabled:text-gray-500 transition duration-300"><MdDelete></MdDelete></button>
                                    <button className="flex items-center justify-center" >
                                        {
                                            contest.status == "accepted" ?
                                                <button disabled={contest.status == "accepted"} className="text-2xl mr-2 rounded-md text-gray-500 transition duration-300"><MdEditDocument></MdEditDocument></button>
                                                :
                                                <Link className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300" to={`/dashboard/update-contests/${contest._id}`}>
                                                    <MdEditDocument></MdEditDocument>
                                                </Link>
                                        }
                                    </button>

                                    {
                                        contest.status == "accepted" ?
                                            <Link to={`/dashboard/contest-submission/${contest._id}`}>
                                                <button className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><PiUsersFourLight></PiUsersFourLight></button>
                                            </Link>
                                            :
                                            <button disabled className="text-2xl mr-2 rounded-md text-gray-500 transition duration-300"><PiUsersFourLight></PiUsersFourLight></button>

                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

MyContestsTable.propTypes = {
    mycontests: PropTypes.array,
    refetch: PropTypes.func,
}

export default MyContestsTable;
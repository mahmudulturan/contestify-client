import PropTypes from 'prop-types';
import { MdDelete, MdEditDocument } from "react-icons/md";
import Swal from 'sweetalert2';
import { axiosSecure } from '../../../../api/axiosSecure';
import { Link } from 'react-router-dom';

const ContestManagerTable = ({ allcontest, refetch }) => {

    const handleDeleteContest = (id) => {
        Swal.fire({
            title: `Want to delete this contest?`,
            text: `Contest will remove from everywhere.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, delete him!"
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


    const handleStatusChange = async (e, id) => {
        const newStatus = e.target.value;
        Swal.fire({
            title: `Want to accept this contest?`,
            text: `This contest will get visible on all contests page`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/contests/${id}`, { status: newStatus })
                if (data?.modifiedCount) {
                    Swal.fire({
                        title: `Now this contest will visible to all users`,
                        text: `Contest visible for all users`,
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <>
            <h4 className="uppercase text-lg text-center text-primaryCol font-medium my-3">Total Added Contest : {allcontest?.length}</h4>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-seconderyCol py-6 px-5 rounded-md text-white font-medium shadow-md">
                        <tr>
                            <th className="py-4 px-4 text-base font-medium text-left">#</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Name</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Status</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Contest Creator</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Start Date</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Deadline</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-seconderyCol/40 py-6 px-5 rounded-md text-white font-medium">
                        {
                            allcontest?.map((contest, indx) => <tr key={contest._id}>
                                <td className="py-4 px-4 text-sm font-normal text-left">{indx + 1}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.name} <span className="block text-xs">{contest?.contest_type}</span></td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <select defaultValue={contest?.status} onChange={(e) => handleStatusChange(e, contest?._id)} name="status" className='bg-transparent outline-none' id="status">
                                        <option value="pending" className="text-gray-800">Pending</option>
                                        <option value="accepted" className="text-gray-800">Accepted</option>
                                    </select>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_creator?.name || "Contest Running"} <span className="block text-xs">{contest?.contest_creator?.email}</span></td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_startDate}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_deadline}</td>
                                <td className="py-4 px-4 text-sm font-normal flex items-center justify-start ">
                                    <button onClick={() => handleDeleteContest(contest?._id)} className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><MdDelete></MdDelete></button>
                                    <Link to={`/dashboard/update-contests/${contest?._id}`}>
                                        <button className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><MdEditDocument></MdEditDocument></button>
                                    </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div></>
    );
};

ContestManagerTable.propTypes = {
    allcontest: PropTypes.array,
    refetch: PropTypes.any,
}

export default ContestManagerTable;
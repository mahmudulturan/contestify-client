import PropTypes from 'prop-types';
import { MdDelete, MdEditDocument } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";

const ContestManagerTable = ({ allcontest }) => {
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
                                    <select defaultValue={contest?.status} name="status" className='bg-transparent outline-none' id="status">
                                        <option value="pending" className="text-gray-800">Pending</option>
                                        <option value="accepted" className="text-gray-800">Accepted</option>
                                    </select>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_creator?.name || "Contest Running"} <span className="block text-xs">{contest?.contest_creator?.email}</span></td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.start_date}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{contest?.contest_deadline}</td>
                                <td className="py-4 px-4 text-sm font-normal flex items-center justify-start ">
                                    <button className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><MdDelete></MdDelete></button>
                                    <button className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><MdEditDocument></MdEditDocument></button>
                                    <button className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><PiUsersFourLight></PiUsersFourLight></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div></>
    );
};

ContestManagerTable.propTypes = {
    allcontest: PropTypes.array
}

export default ContestManagerTable;
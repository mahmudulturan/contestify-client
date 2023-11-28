import PropTypes from 'prop-types';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { axiosSecure } from '../../../../api/axiosSecure';

const UsersManageTable = ({ users, refetch }) => {


    const handleDeleteUser = (user) => {

        Swal.fire({
            title: `Want to delete "${user?.name}" from Contestify?`,
            text: `${user?.name} he will loose all access.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, delete him!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/users/${user?._id}`)
                console.log(data);
                if (data?.deletedCount > 0) {
                    Swal.fire({
                        title: `${user?.name} sucessfully delete from contestify`,
                        text: `${user?.name} he loosed all access.`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });

    }


    const handleRoleChange = async (e, user) => {
        const newRole = e.target.value;
        Swal.fire({
            title: `Want to make "${user?.name}" as an ${newRole}?`,
            text: `${user?.name} will get all ${newRole} power.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ECDB9",
            cancelButtonColor: "#1B1D4D",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/users/${user?._id}`, { role: newRole })
                if (data?.modifiedCount) {
                    Swal.fire({
                        title: `Now ${user?.name} as an ${newRole}`,
                        text: `${user?.name} got all ${newRole} power`,
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <>
            <h4 className="uppercase text-lg text-center text-primaryCol font-medium my-3">Total Users : {users?.length}</h4>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-seconderyCol py-6 px-5 rounded-md text-white font-medium shadow-md">
                        <tr>
                            <th className="py-4 px-4 text-base font-medium text-left">#</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Info</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Role</th>
                            <th className="py-4 px-4 text-base font-medium text-left">User Since</th>
                            <th className="py-4 px-4 text-base font-medium text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-seconderyCol/40 py-6 px-5 rounded-md text-white font-medium">
                        {
                            users?.map((user, indx) => <tr key={user._id}>
                                <td className="py-4 px-4 text-sm font-normal text-left">{indx + 1}</td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <div className='flex items-center justify-start gap-3'>
                                        <img className='w-16 h-16 object-cover rounded-md' src={user?.image} alt="" />
                                        <div>
                                            {user?.name} <span className="block text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">
                                    <select onChange={(e) => handleRoleChange(e, user)} defaultValue={user?.role} name="status" className='bg-transparent outline-none' id="status">
                                        <option value="user" className="text-gray-800">User</option>
                                        <option value="creator" className="text-gray-800">Creator</option>
                                        <option value="admin" className="text-gray-800">Admin</option>
                                    </select>
                                </td>
                                <td className="py-4 px-4 text-sm font-normal text-left">{user?.userDate}</td>
                                <td className="py-4 px-4 text-sm font-normal flex items-center justify-start ">
                                    <button onClick={() => handleDeleteUser(user)} className="text-2xl mr-2 rounded-md hover:text-primaryCol transition duration-300"><MdDelete></MdDelete></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div></>
    );
};

UsersManageTable.propTypes = {
    users: PropTypes.array,
    refetch: PropTypes.any
}

export default UsersManageTable;
import { FaSpinner } from "react-icons/fa6";
import { imageUpload } from "../../../../api/utils";
import Container from "../../../../components/Shared/Container/Container";
import useAuth from "../../../../hooks/useAuth";
import useUser from "../../../../hooks/useUser";
import { useState } from "react"
import { IoMdCamera } from "react-icons/io";
import { axiosSecure } from "../../../../api/axiosSecure";
import { FaEdit } from "react-icons/fa";
import WinningPercentageChart from "./WinningPercentageChart";


const MyProfile = () => {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const { user, refetch } = useUser();
    const [name, setName] = useState(user?.name);
    const [editMode, setEditMode] = useState(false);
    const { updateUsersProfile } = useAuth()

    const handleImageUpdate = async () => {
        setLoading(true)
        const { data } = await imageUpload(selectedFile)
        await updateUsersProfile(user?.displayName, data.display_url)
        const dbresponse = await axiosSecure.patch(`/users/${user?.email}`, { image: data?.display_url })
        if (dbresponse.data.modifiedCount > 0) {
            refetch()
        }
        setLoading(false)
        setSelectedFile(null)
    }
    const handleNameUpdate = async () => {
        setLoading(true)
        await updateUsersProfile(name, user?.image)
        const dbresponse = await axiosSecure.patch(`/users/${user?.email}`, { name: name })
        if (dbresponse.data.modifiedCount > 0) {
            refetch()
        }
        setLoading(false)
        setEditMode(false)
    }
    return (

        <div>
            <Container>
                <div>
                    <div>
                        <div className="px-6 py-4 bg-primaryCol rounded-md max-w-2xl mx-auto flex flex-col justify-center items-center relative">
                            <div className="relative group">
                                <label htmlFor="fileInput" className="cursor-pointer">
                                    <img className="rounded-full h-28 w-28 object-contain" src={selectedFile ? URL.createObjectURL(selectedFile) : user?.image} alt="" />
                                    <div className="w-28 h-28 absolute top-0 text-3xl bg-bgCol/60 rounded-full hidden justify-center items-center text-white group-hover:flex"><IoMdCamera /></div>
                                </label>
                                <span className="py-1 px-2 bg-bgCol/40 text-white text-xs uppercase font-medium rounded-md absolute top-0 -right-2">
                                    {user?.role}
                                </span>
                                <div className="text-center my-1">
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                            </div>
                            {
                                selectedFile && <div>
                                    {
                                        loading ? <button className="animate-spin"><FaSpinner></FaSpinner></button> : <button onClick={handleImageUpdate} className="py-1 px-3 rounded-md border-2 border-seconderyCol">Update</button>
                                    }
                                </div>
                            }
                            <div className="flex items-center">
                                {
                                    editMode ?
                                        <input onChange={(e) => setName(e.target.value)} type="text" className="bg-transparent text-2xl font-semibold mt-3 text-white drop-shadow-lg outline-none text-center" defaultValue={user?.name} name="" id="name" />
                                        :
                                        <span className="text-2xl font-semibold mt-3 text-white drop-shadow-lg">{user?.name}</span>
                                }
                            </div>
                            {
                                editMode && <div>
                                    {
                                        loading ? <button className="animate-spin"><FaSpinner></FaSpinner></button> : <button onClick={handleNameUpdate} className="py-1 px-3 rounded-md border-2 border-seconderyCol">Update</button>
                                    }
                                </div>
                            }
                            <label htmlFor="name" className="ml-2 cursor-pointer" onClick={() => setEditMode(!editMode)}><FaEdit></FaEdit></label>
                            <span className="text-lg font-medium my-1 text-white">{user?.email}</span>
                        </div>
                    </div>
                    <div className="w-full mx-auto relative">
                        <h1 className="text-center font-medium text-3xl text-white absolute top-5">Your Winning Stats</h1>
                        <WinningPercentageChart></WinningPercentageChart>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default MyProfile;
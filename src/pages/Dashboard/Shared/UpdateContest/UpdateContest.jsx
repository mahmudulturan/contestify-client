import { MdOutlineFileUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { CgSpinnerTwo } from "react-icons/cg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import Container from "../../../../components/Shared/Container/Container";
import Button from "../../../../components/Shared/Button/Button";
import useAuth from "../../../../hooks/useAuth";
import { imageUpload } from "../../../../api/utils";
import { axiosSecure } from "../../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";



const UpdateContest = () => {
    const [uploadImage, setUploadImage] = useState()
    const [loading, setLoading] = useState(false)
    const [contestDeadline, setContestDeadline] = useState(new Date())
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ["update-contest"], queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`)
            setContestDeadline(new Date(res?.data?.contest_deadline))
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const { _id, name, image: oldImage, description, contest_price, prize_money, task_submission_instruction, contest_type, participate_count } = data;


    const onSubmit = async (data) => {
        setLoading(true)
        try {
            let image = oldImage;
            if (uploadImage) {
                const { data: imageData } = await imageUpload(uploadImage)
                image = imageData?.display_url || oldImage

            }
            setLoading(true)
            const name = data.name;
            const description = data.description;
            const contest_price = Number(data.price);
            const prize_money = Number(data.prize);
            const task_submission_instruction = data.instruction;
            const contest_type = data.type;
            const contest_startDate = new Date().toLocaleDateString();
            const contest_deadline = contestDeadline.toLocaleDateString();
            const status = "pending";
            const contest_creator = {
                email: user?.email,
                name: user?.displayName,
            }
            const contestData = { name, image, description, contest_price, prize_money, task_submission_instruction, status, contest_type, contest_deadline, participate_count, contest_startDate, contest_creator }

            const { data: result } = await axiosSecure.put(`/contests/${_id}`, contestData)
            if (result.modifiedCount > 0) {
                setUploadImage("")
                setContestDeadline(new Date(contestDeadline))
                setLoading(false)
                toast.success('Successfully updated!');
            }
            setLoading(false)
        }
        catch (err) {
            toast.error('error!');
            setLoading(false)
        }

    }
    console.log(loading);

    return (
        <div>
            <PageTitle
                bgImage="https://i.ibb.co/NV2ryVj/6272289.jpg"
                subHeading="Edit and Enhance Existing Contests"
                heading="Revamp Your Contests"
                paragraph="Bring new life to your contests. Edit and enhance existing contests to ensure they stay captivating and relevant.">
            </PageTitle>
            <Container minHeight padding>
                <div className="pb-12 pt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-white text-xl my-2">Contest Name</label>
                                <input {...register("name", { required: true })} defaultValue={name} type="text" name="name" id="name" placeholder="Your Name" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.name && <span className="text-red-400 mt-2 font-medium">You must have to input an name...</span>}
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-white text-xl my-2">Contest Photo</label>
                                <div className="text-center">
                                    <label>
                                        <div className="px-3 py-3 rounded-md outline-none w-full bg-white border border-gray-300 font-semibold cursor-pointer p-1 text-center ">
                                            <h3 className="flex items-center justify-center gap-2">
                                                <MdOutlineFileUpload className="text-2xl" />  {uploadImage?.name || "Upload A Image About This Contest"}
                                            </h3>
                                        </div>
                                        <input {...register("image")} onChange={(e) => setUploadImage(e.target.files[0])} type="file" name="image" id="image" accept="image/*" className="text-sm cursor-pointer w-36 hidden" hidden />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-white text-xl my-2">Contest Price</label>
                                <input {...register("price", { required: true })} defaultValue={contest_price} type="number" name="price" id="price" placeholder="Input The Entry Fee" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.price && <span className="text-red-400 mt-2 font-medium">You must have to include contest price...</span>}
                            </div>
                            <div>
                                <label htmlFor="prize" className="block text-white text-xl my-2">Prize Money</label>
                                <input {...register("prize", { required: true })} defaultValue={prize_money} type="number" name="prize" id="prize" placeholder="Input Prize Money" className="px-3 py-3 rounded-md outline-none w-full" />
                                {errors.prize && <span className="text-red-400 mt-2 font-medium">You must have to include contest prize...</span>}
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-white text-xl my-2">Contest Type</label>
                                <select defaultValue={contest_type} {...register("type", { required: true })} name="type" id="type" className="px-3 py-3 rounded-md outline-none w-full">
                                    <option value="" disabled>Select Your Contest Type</option>
                                    <option value="Business Contest" >Business Contest</option>
                                    <option value="Medical Contest" >Medical Contest</option>
                                    <option value="Article Writing" >Article Writing</option>
                                    <option value="Gaming" >Gaming</option>
                                </select>

                                {errors.type && <span className="text-red-400 mt-2 font-medium">You must have to select an contest type...</span>}
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block text-white text-xl my-2">Contest Deadline</label>
                                <h3 className="px-3 py-3 rounded-md outline-none w-full">
                                    <DatePicker
                                        width="100%"
                                        showIcon
                                        selected={contestDeadline}
                                        onChange={(date) => setContestDeadline(date)}
                                        icon="fa fa-calendar"
                                        className="px-3 py-3 rounded-md outline-none w-full"
                                    />
                                </h3>

                                {/* {errors.date && <span className="text-red-400 mt-2 font-medium">You must have to input an name...</span>} */}
                            </div>
                            <div>
                                <label htmlFor="instruction" className="block text-white text-xl my-2">Submission Instruction</label>
                                <textarea {...register("instruction", { required: true })} defaultValue={task_submission_instruction} name="instruction" id="instruction" placeholder="Explain Here Your Task Submission Instruction..." className="px-3 py-3 rounded-md outline-none w-full">
                                </textarea>
                                {errors.instruction && <span className="text-red-400 mt-2 font-medium">You must have to explain about your constes</span>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-white text-xl my-2">Description</label>
                                <textarea {...register("description", { required: true })} defaultValue={description} name="description" id="description" placeholder="More Detail About Your Contest..." className="px-3 py-3 rounded-md outline-none w-full">
                                </textarea>
                                {errors.description && <span className="text-red-400 mt-2 font-medium">You must have to explain about your constes</span>}
                            </div>

                            <div className="text-center my-3 md:col-span-2">
                                {
                                    loading ?
                                        <Button wfull={true} icon={CgSpinnerTwo} spin={true} transparent={true} disable={false}></Button>
                                        :
                                        <Button wfull={true} name="Update Contest"></Button>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </Container>
        </div>
    );
};

export default UpdateContest;
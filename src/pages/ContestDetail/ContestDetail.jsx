import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import Container from "../../components/Shared/Container/Container";
import DeadlineCountdown from "../../components/DeadlineCountdown/DeadlineCountdown";
import Button from "../../components/Shared/Button/Button";
import { useState, useEffect } from 'react';
import Loading from "../../components/Loading/Loading";
import { axiosSecure } from "../../api/axiosSecure";
import useAuth from "../../hooks/useAuth";

const ContestDetail = () => {
    const [deadlineOver, setDeadlineOver] = useState(false)
    const [participated, setParticipated] = useState(false);
    const { user } = useAuth()
    const { id } = useParams();
    const { data = {}, isLoading } = useQuery({
        queryKey: ["contest-detail",], queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`)
            const isParticipate = await axiosSecure.get(`/is-participated/${user?.email}?contestID=${res.data._id}`)
            if (isParticipate.data.length > 0) {
                setParticipated(true)
            }
            return res.data
        }
    })
    const now = new Date().getTime();
    const endTime = new Date(data?.contest_deadline).getTime();
    const timeRemaining = endTime - now;
    useEffect(() => {
        if (timeRemaining < 0) {
            setDeadlineOver(true)
        }
        else {
            setDeadlineOver(false)
        }
    }, [timeRemaining])

    if (isLoading) return <Loading></Loading>

    const { _id, name, image, description, contest_price, prize_money, task_submission_instruction, contest_type, contest_deadline, participate_count, winner } = data;




    return (
        <div>
            <PageTitle bgImage={image} heading={name} paragraph={description}></PageTitle>
            <Container padding={true} minHeight={true}>
                <div className="py-12 px-2 md:px-0 text-white">
                    <div className="flex items-center justify-center">
                        {
                            winner ?
                                <div className="py-3 md:px-4 rounded-md bg-seconderyCol max-w-md text-center shadow-md">
                                    <h4 className='font-medium text-2xl px-9'>Contest over</h4>
                                </div>
                                :
                                <DeadlineCountdown deadline={contest_deadline}></DeadlineCountdown>
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-3">
                        <div className="py-2 px-6 rounded-md bg-seconderyCol max-w-md my-6 flex-1 shadow-md">
                            <p className="text-lg">Entry Fee: <span className="text-2xl mx-3 font-semibold">${contest_price}</span></p>
                            <p className="text-lg">Prize Money: <span className="text-2xl mx-3 font-semibold">${prize_money}</span></p>
                        </div>
                        <div className={`py-2 px-6 rounded-md bg-seconderyCol max-w-md my-6 flex-1 shadow-md text-center ${winner || "md:invisible hidden md:flex"}`}>
                            <span className="border-b-2 px-2 mb-2">Winner</span>
                            <div className="flex items-center justify-center gap-4 my-1">
                                <img className="w-12 object-cover rounded-full" src={winner?.image} alt="" />
                                <p className="text-lg"><span className="text-2xl font-semibold uppercase">{winner?.name}</span></p>
                            </div>
                        </div>
                        <div className="py-2 px-6 rounded-md bg-seconderyCol max-w-md my-6 flex-1 shadow-md">
                            <p className="text-lg">Already Participated: <span className="text-2xl font-semibold">{participate_count}</span></p>
                            <p className="text-lg">Category: <span className="text-2xl font-semibold">{contest_type}</span> </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="py-2 px-6 rounded-md bg-seconderyCol max-w-lg my-6 shadow-md text-center">
                            <span className="border-b-2 px-2 mb-2">Task</span>
                            <p className="my-2">{task_submission_instruction}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {
                            winner || deadlineOver ?
                                <Button disable transparent={true} name="Contest Over"></Button>
                                :
                                participated ?
                                    <Button disable={participated || !deadlineOver || !winner} name="Participated" spin></Button>
                                    :
                                    <Link to={`/constest/payment/${_id}`}>
                                        <Button name="Register" ></Button>
                                    </Link>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContestDetail;
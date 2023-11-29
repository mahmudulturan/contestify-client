import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container/Container";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import { axiosSecure } from "../../../../api/axiosSecure";
import { useParams } from "react-router-dom";
import ContestSubmissionTable from "./ContestSubmissionTable";
import WinningContestCard from "../../User/WinningContest/WinningContestCard";

const ContestSubmission = () => {
    const { id } = useParams()
    const { data, refetch } = useQuery({
        queryKey: ["submission-contest", id], queryFn: async () => {
            const res = await axiosSecure.get(`/total-submitted/${id}`)
            const {data} = await axiosSecure.get(`/contests/${id}`)
            return {allsubmission: res.data, contestDetail : data}
        }
    })
    const winner = data?.contestDetail?.winner
    return (
        <div>
            <PageTitle
                heading={`Manage ${data?.contestDetail?.name} Submissions`}
                subHeading="View and Declare Winners for Each Task"
                paragraph="Explore all submissions for your contest, including participant details. Easily declare winners by clicking the button beside each task."
            ></PageTitle>
            <Container padding>
                <div className="py-12">
                    <div>
                        {
                            winner &&
                            <WinningContestCard contest={data?.contestDetail}>

                            </WinningContestCard>
                        }
                    </div>
                    <ContestSubmissionTable allsubmission={data?.allsubmission} refetch={refetch} winner={winner}>

                    </ContestSubmissionTable>
                </div>
            </Container>
        </div>
    );
};

export default ContestSubmission;
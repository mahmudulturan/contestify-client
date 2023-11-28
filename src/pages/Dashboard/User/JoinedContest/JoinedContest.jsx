import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container/Container";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import JoinedContestTable from "./JoinedContestTable";
import { axiosSecure } from "../../../../api/axiosSecure";
import useAuth from "../../../../hooks/useAuth";

const JoinedContest = () => {
    const { user } = useAuth();

    let url = `/is-participated/${user?.email}`

    const { data: joinedContests, refetch } = useQuery({
        queryKey: ["joined-contests", url], queryFn: async () => {
            const res = await axiosSecure.get(url)
            return res.data
        }
    })
    const handleUpcommingSort = ()=>{
        url = `/is-participated/${user?.email}?sortBy=deadline`
        refetch()
    }
    
    return (
        <div>
            <PageTitle
                heading="My Joined Contests"
                subHeading="Explore Your Current Engagements"
                paragraph="Discover and manage the contests you're currently part of. Explore and engage with your ongoing creative endeavors."
            ></PageTitle>
            <Container padding>
                <div className="py-12">
                    <JoinedContestTable joinedContests={joinedContests} handleUpcommingSort={handleUpcommingSort}></JoinedContestTable>
                </div>
            </Container>
        </div>
    );
};

export default JoinedContest;
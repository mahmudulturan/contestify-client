import { useQuery } from "@tanstack/react-query";
import MyContestsTable from "./MyContestsTable";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import Container from "../../../../components/Shared/Container/Container";
import { axiosSecure } from "../../../../api/axiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";


const MyContests = () => {
    const { user } = useAuth()
    const { data: mycontests, isLoading, refetch } = useQuery({
        queryKey: ["mycontests", user?.email], queryFn: async () => {
            const res = await axiosSecure.get(`/my-contests/${user?.email}`)
            return res.data
        }
    })
    return (
        <div>
            <PageTitle
                bgImage="https://i.ibb.co/NV2ryVj/6272289.jpg"
                heading="My Contests"
                subHeading="Explore Your Creative Journey"
                paragraph="Dive into the contests you've created and participated in. Your creative endeavors, all in one place.">
            </PageTitle>
            <Container padding>
                <div className="py-12">
                    {
                        isLoading ? <Loading></Loading> : <MyContestsTable mycontests={mycontests} refetch={refetch}></MyContestsTable>
                    }
                </div>
            </Container>
        </div>
    );
};

export default MyContests;
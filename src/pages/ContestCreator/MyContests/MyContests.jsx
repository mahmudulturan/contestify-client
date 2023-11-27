import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container/Container";
import PageTitle from "../../../components/Shared/PageTitle/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyContestsTable from "./MyContestsTable";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";


const MyContests = () => {
    const { user } = useAuth()
    const axios = useAxiosSecure();
    const { data: mycontests, isLoading } = useQuery({
        queryKey: ["mycontests", user?.email], queryFn: async () => {
            const res = await axios.get(`/contests?email=${user?.email}`)
            return res.data
        }
    })
    console.log(mycontests);
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
                        isLoading ? <Loading></Loading> : <MyContestsTable mycontests={mycontests}></MyContestsTable>
                    }
                </div>
            </Container>
        </div>
    );
};

export default MyContests;
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import Container from "../../../components/Shared/Container/Container";
import { useQuery } from "@tanstack/react-query";
import ContestCard from "../../../components/ContestCard/ContestCard";
import Button from "../../../components/Shared/Button/Button";
import { Link } from "react-router-dom";
import { axiosPublic } from "../../../api/axiosSecure";

const PopularSection = () => {
    const { data: popularContests } = useQuery({
        queryKey: ["popularContests"], queryFn: async () => {
            const res = await axiosPublic.get('/popular-contests')
            return (res.data)
        }
    })
    return (
        <div className="pb-12 px-2 md:px-0">
            <Container>
                <SectionTitle
                    subHeading="Trending Now"
                    heading="Popular Contests"
                    paragraph="Dive into trending contests on Contest Canvas. Explore, vote, and unleash your creativity in the hottest competitions. Join now!">
                </SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    {
                        popularContests?.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
                    }
                </div>
                <div className="text-center">
                    <Link to="/all-contest">
                        <Button transparent={true} name="Explore More"></Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default PopularSection;
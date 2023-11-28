import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container/Container";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import { axiosSecure } from "../../../../api/axiosSecure";
import useAuth from "../../../../hooks/useAuth";
import WinningContestCard from "./WinningContestCard";

const WinningContest = () => {
    const {user} = useAuth()
    const {data: winningContests} = useQuery({queryKey: ["winning-contest"], queryFn: async()=>{
        const res = await axiosSecure(`/get-winners?email=${user?.email}`)
        return res.data;
    }})
  return (
   <div className="px-2 md:px-0">
    <PageTitle 
    heading="Celebrate Your Victories"
    subHeading="Explore Your Winning Contest Achievements"
    paragraph="Revel in the joy of your victories. Explore the showcase of contests where you stood out and achieved greatness."
    ></PageTitle>
    <Container padding>
    <div className="py-12">
    <div>
        {
            winningContests?.map(contest => <WinningContestCard contest={contest} key={contest._id}></WinningContestCard>)
        }
    </div>
    </div>
    </Container>
   </div>
  );
};

export default WinningContest;
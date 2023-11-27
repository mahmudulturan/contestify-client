import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container/Container";
import PageTitle from "../../../components/Shared/PageTitle/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ContestManagerTable from "./ContestManagerTable";
import Loading from "../../../components/Loading/Loading";

const ContestManager = () => {
  const axios = useAxiosSecure()
  const { data: allcontest, isLoading } = useQuery({
    queryKey: ["all-contests"], queryFn: async () => {
      const res = await axios.get("/all-contests")
      return res.data;
    }
  })


  return (
    <div>
      <PageTitle
        heading="Manage Contests"
        subHeading="Effortless Administration"
        paragraph="Streamline contest oversight with our control center. Efficiently organize, track, and optimize contests for a seamless administrative experience."
      ></PageTitle>
      <Container padding>
        <div className="py-12">
          {
            isLoading? <Loading></Loading> : <ContestManagerTable allcontest={allcontest}></ContestManagerTable>
          }
        </div>
      </Container>
    </div>
  );
};

export default ContestManager;
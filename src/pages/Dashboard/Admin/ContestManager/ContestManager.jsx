import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container/Container";
import Loading from "../../../../components/Loading/Loading";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import ContestManagerTable from "./ContestManagerTable";
import { axiosSecure } from "../../../../api/axiosSecure";

const ContestManager = () => {
  const { data: allcontest, isLoading, refetch } = useQuery({
    queryKey: ["all-contests"], queryFn: async () => {
      const res = await axiosSecure.get("/all-contests")
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
            isLoading? <Loading></Loading> : <ContestManagerTable allcontest={allcontest} refetch={refetch}></ContestManagerTable>
          }
        </div>
      </Container>
    </div>
  );
};

export default ContestManager;
import Categories from "../../components/Categories/Categories";
import ContestCard from "../../components/ContestCard/ContestCard";
import Loading from "../../components/Loading/Loading";
import Container from "../../components/Shared/Container/Container";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import useContests from "../../hooks/useContests";
import { useState } from 'react';



const AllContest = () => {
  const [searchKey, setSearchKey] = useState("all")
  const { data = [], isLoading } = useContests()

  return (
    <div className="">
      <PageTitle
        bgImage="https://i.ibb.co/51zn375/6921.jpg"
        subHeading="Discover the Variety"
        heading="All Contests"
        paragraph="Explore a diverse array of contests catering to every passion. From artistry to innovation, find your perfect challenge in our comprehensive contest collection.">
      </PageTitle>
      {
        isLoading ?
          <Loading></Loading>
          :
          <Container padding={true}>
            <div className="py-12">
              <div>
                <Categories searchKey={searchKey} setSearchKey={setSearchKey}></Categories>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {
                  data?.map(item => <ContestCard key={item._id} contest={item}></ContestCard>)
                }
              </div>
            </div>
          </Container>
      }
    </div>
  );
};

export default AllContest;
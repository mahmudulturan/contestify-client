import AdvertiseSection from "./AdvertiseSection/AdvertiseSection";
import Banner from "./Banner/Banner";
import PopularSection from "./PopularSection/PopularSection";

const Home = () => {
  return (
   <div>
    <Banner></Banner>
    <PopularSection></PopularSection>
    <AdvertiseSection></AdvertiseSection>
   </div>
  );
};

export default Home;
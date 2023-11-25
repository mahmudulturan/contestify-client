import Button from "../../../components/Shared/Button/Button";
import Container from "../../../components/Shared/Container/Container";
import bannerAnimation from '../../../assets/Animations/BannerAnimation.json';
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(https://i.ibb.co/vB20fC7/banner-bg.jpg)" }}>
      <div className="">
        <Container>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center p-2 lg:p-0 my-10">
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-primaryCol uppercase">Contest Creation Platform</h4>
              <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-white my-2 md:my-6">Crafting Dreams, Competing in Style</h1>
              <div className="inline py-5 pl-2 pr-1 text-center md:border border-primaryCol">
                <input className="py-2 md:py-4 px-4 md:px-6 outline-none bg-transparent rounded-l-lg text-white" placeholder="Search Contest" type="text" name="search" id="search" />
                <Button name="Search"></Button>
              </div>
            </div>
            <div className="flex-1">
              <Lottie animationData={bannerAnimation} loop={true} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
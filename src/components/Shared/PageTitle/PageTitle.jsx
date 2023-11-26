import PropTypes from 'prop-types';

const PageTitle = ({ bgImage, heading, subHeading, paragraph }) => {
  return (
    <div className="min-h-[35vh]" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="w-full min-h-[35vh] bg-bgCol/75">
        <div className="max-w-7xl mx-auto pt-20 md:pt-28 py-6 px-2 md:px-0">
          <div className="border-l-8 rounded-md pl-2 border-primaryCol">
            <h4 className="text-lg md:text-2xl font-semibold text-primaryCol uppercase">{subHeading}</h4>
            <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase font-bold text-white my-1 md:my-2">{heading}</h2>
            <p className="max-w-3xl text-sm md:text-lg text-white">{paragraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
PageTitle.propTypes = {
  bgImage: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  paragraph: PropTypes.string,
}

export default PageTitle;
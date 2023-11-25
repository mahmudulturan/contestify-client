import PropTypes from 'prop-types'
const SectionTitle = ({heading, subHeading, paragraph}) => {
  return (
   <div className="text-center">
        <h4 className="text-lg md:text-2xl font-semibold text-primaryCol uppercase">{subHeading}</h4>
        <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase font-bold text-white my-1 md:my-3">{heading}</h2>
        <p className="max-w-3xl mx-auto text-sm md:text-lg text-white">{paragraph}</p>
   </div>
  );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    paragraph: PropTypes.string,
}
export default SectionTitle;
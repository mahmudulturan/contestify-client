import PropTypes from 'prop-types';
const Container = ({children, minHeight, padding}) => {
  return (
   <div className={`max-w-7xl mx-auto ${padding || "pt-20 md:pt-28"}  ${minHeight || "min-h-screen"}`}>
    {children}
   </div>
  );
};
Container.propTypes = {
  children: PropTypes.node,
  minHeight: PropTypes.bool,
  padding: PropTypes.bool,
}

export default Container;
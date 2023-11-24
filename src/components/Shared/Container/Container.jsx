import PropTypes from 'prop-types';
const Container = ({children}) => {
  return (
   <div className="max-w-7xl mx-auto pt-20 md:pt-28 min-h-screen">
    {children}
   </div>
  );
};
Container.propTypes = {
  children: PropTypes.node
}

export default Container;
import PropTypes from 'prop-types';
const Button = ({ name, icon: Icon }) => {
    return (
        <button className='py-2 md:py-3 px-4 md:px-6 font-bold text-white transition duration-300 bg-primaryCol hover:bg-transparent border-2 border-primaryCol  rounded-xl text-lg uppercase'>{name} {Icon && <Icon className='inline text-2xl'></Icon>}</button>
    );
};

Button.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.any
}

export default Button;
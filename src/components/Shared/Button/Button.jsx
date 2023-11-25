import PropTypes from 'prop-types';
const Button = ({ name, icon: Icon, transparent, wfull }) => {
    return (
        <button className={`py-2 md:py-3 px-4 md:px-6 font-bold text-white transition duration-300 ${transparent? "bg-transparent hover:bg-primaryCol" : "bg-primaryCol hover:bg-transparent"} border-2 border-primaryCol rounded-xl text-lg uppercase ${wfull && "w-full"}`}>{name} {Icon && <Icon className='inline text-2xl'></Icon>}</button>
    );
};

Button.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.any,
    transparent: PropTypes.bool,
    wfull: PropTypes.bool,
}

export default Button;
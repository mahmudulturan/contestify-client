import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

const NavItem = ({ path, name }) => {
    return (
        <NavLink to={path} className={({ isActive}) =>
         isActive ? "text-primaryCol font-semibold text-lg" : "text-white font-semibold text-lg hover:text-primaryCol transition duration-300"
        }>{name}</NavLink>
    );
};

NavItem.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string
}

export default NavItem;
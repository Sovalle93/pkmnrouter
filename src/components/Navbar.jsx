import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? 'active' : undefined);

    return (
    <nav className='navbar'>
        <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'></img>
        <NavLink className={`customNavLink ${setActiveClass}`} to="/">
            Home
        </NavLink>
        <NavLink className={`customNavLink ${setActiveClass}`} to="/Pokemones">
            Pokemones
        </NavLink>
    </nav>
    );
};

export default Navbar;

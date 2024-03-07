import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import './Navbar.css';
const Navbar = () => {
  return (
    <header className='header'>
      <nav className='nav container'>
        <NavLink to='/' className='nav__logo'>
          StudieforeningsKalenderen
        </NavLink>

        <div className={'nav__menu'} id='nav-menu'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <NavLink to='/' className='nav__link'>
                Startside
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink to='/kalender' className='nav__link'>
                Kalender
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink to='/login' className='nav__link'>
                Login
              </NavLink>
            </li>
          </ul>
          <div className='nav__close' id='nav-close'>
            <IoClose />
          </div>
        </div>

        <div className='nav__toggle' id='nav-toggle'>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

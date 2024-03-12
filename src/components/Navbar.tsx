import { NavLink } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import './Navbar.css';
import ToggleSlider from './ToggleSlider';
import Button from './Button';
import { useState } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Add this line
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
                <ToggleSlider
                  toggle={false}
                  text={['Populære events', 'Det sker snart']}
                />
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink to='/kalender' className='nav__link'>
                <IoCalendarOutline size='2.5em' />
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink to='/login' className='nav__link'>
                {loggedIn ? (
                  <Button label='Profil' />
                ) : (
                  <Button label='Login' />
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

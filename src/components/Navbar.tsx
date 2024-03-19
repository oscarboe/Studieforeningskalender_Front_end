import { NavLink } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import './Navbar.css';
import ToggleSlider from './ToggleSlider';
import { useState } from 'react';

const Navbar = () => {
	const [loggedIn] = useState(false); // Add this line
	const isHome = window.location.pathname + window.location.search == '/';

	return (
		<nav className={(isHome ? 'isHome ' : '') + 'nav container'}>
			<NavLink to='/' className='nav__logo'>
				StudieforeningsKalenderen
			</NavLink>

			<ul className='nav__list'>
				<li className='nav__item'>
					<NavLink to='/' className='nav__link'>
						<ToggleSlider toggle={false} text={['Populære events', 'Det sker snart']} />
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to='/kalender' className='nav__link'>
						<IoCalendarOutline size='2.5em' />
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to='/login' className='nav__link'>
						{loggedIn ? <button id='profileButton'>Profil</button> : <button id='loginButton'>Login</button>}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

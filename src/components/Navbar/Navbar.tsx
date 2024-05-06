import { NavLink, useLocation } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import './Navbar.css';
import ToggleSlider from '../ToggleSlider/ToggleSlider';
import { useDispatch, useSelector } from 'react-redux';
import { changeSorting } from '../../Redux/Slices/sortPopularSlice';
import { useQuery } from '@apollo/client';
import { VALIDATE_SESSION } from '../../Queries/UserQueries';
import { RootState } from '../../Redux/store';
import { setLoggedIn } from '../../Redux/Slices/loggedInSlice';
import FBInit from '../ImportFacebook/FacebookInit';

const Navbar = () => {
	const location = useLocation();
	const loggedIn = useSelector((state: RootState) => state.loggedIn);
	const dispatch = useDispatch();

	const {} = useQuery(VALIDATE_SESSION, {
		onCompleted: () => dispatch(setLoggedIn(true)),
		onError: () => dispatch(setLoggedIn(false)),
	});

	return (
		<nav className={(location.pathname === '/' ? 'isHome ' : '') + 'nav container'}>
			<NavLink to='/' className='nav__logo'>
				StudieforeningsKalenderen
			</NavLink>

			<ul className='nav__list'>
				<li className='nav__item'>
					<NavLink to='/' className='nav__link'>
						<ToggleSlider
							setSortPopular={() => dispatch(changeSorting())}
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
					{loggedIn ? (
						<NavLink to='/Account' className='nav__link'>
							<button id='profileButton'>Profil</button>
						</NavLink>
					) : (
						<NavLink to='/login' className='nav__link'>
							<button id='loginButton'>Login</button>
						</NavLink>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

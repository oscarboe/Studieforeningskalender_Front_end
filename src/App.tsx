import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import KalenderPage from './pages/KalenderPage/KalenderPage';
import HomePage from './pages/HomePage/HomePage';
import Alerts from './components/Alerts/Alerts';
import Verify from './pages/VerifyPage/Verify';
import AccountPage from './pages/AccountPage/AccountPage';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';

export default function App() {
	const isLoggedIn = useSelector((state: RootState) => state.loggedIn);

	return (
		<BrowserRouter>
			<Alerts />
			<Navbar />
			<Routes>
				<Route path='/Account' element={isLoggedIn ? <AccountPage /> : <Navigate to='/' />} />
				<Route path='/Verify' element={<Verify />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/kalender' element={<KalenderPage />}></Route>
				<Route path='/' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import KalenderPage from './pages/KalenderPage/KalenderPage';
import HomePage from './pages/HomePage/HomePage';
import AddEventPage from './pages/AddEventPage/AddEventPage';

import Alerts from './components/Alerts/Alerts';
import Verify from './pages/VerifyPage/Verify';
// import FBInit from './FacebookInit';

export default function App() {
	return (
		<BrowserRouter>
			<Alerts />
			<Navbar />
			{/* <FBInit /> */}
			<Routes>
				<Route path='/Verify' element={<Verify />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/kalender' element={<KalenderPage />}></Route>
				<Route path='/AddEvent' element={<AddEventPage />}></Route>
				<Route path='/' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

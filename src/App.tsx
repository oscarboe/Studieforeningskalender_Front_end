import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Alerts from './components/Alerts/Alerts';

import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

import Verify from './pages/VerifyPage/Verify';
import AccountPage from './pages/AccountPage/AccountPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import AddEventPage from './pages/AddEventPage/AddEventPage';

import EventPage from './pages/EventPage/EventPage';

export default function App() {
	return (
		<BrowserRouter>
			<Alerts />
			<Navbar />
			<Routes>
				<Route path='/Account' element={<AccountPage />} />
				<Route path='/Verify' element={<Verify />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/Calendar' element={<CalendarPage />} />
				<Route path='/AddEvent' element={<AddEventPage />} />
				<Route path='/Event' element={<EventPage />} />
				<Route path='/' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

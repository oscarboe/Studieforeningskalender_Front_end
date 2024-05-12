import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Alerts from './components/Alerts/Alerts';
import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Verify = lazy(() => import('./pages/VerifyPage/Verify'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage/CalendarPage'));
const AddEventPage = lazy(() => import('./pages/AddEventPage/AddEventPage'));
const EventPage = lazy(() => import('./pages/EventPage/EventPage'));

import HomePage from './pages/HomePage/HomePage';
import Spinner from './components/Spinner/Spinner';

export default function App() {
	return (
		<BrowserRouter>
			<Alerts />
			<Navbar />
			<Routes>
				<Route
					path='/Account'
					element={
						<Suspense fallback={<Spinner />}>
							<AccountPage />
						</Suspense>
					}
				/>
				<Route
					path='/Verify'
					element={
						<Suspense fallback={<Spinner />}>
							<Verify />
						</Suspense>
					}
				/>
				<Route
					path='/login'
					element={
						<Suspense fallback={<Spinner />}>
							<LoginPage />
						</Suspense>
					}
				/>
				<Route
					path='/Calendar'
					element={
						<Suspense fallback={<Spinner />}>
							<CalendarPage />
						</Suspense>
					}
				/>
				<Route
					path='/AddEvent'
					element={
						<Suspense fallback={<Spinner />}>
							<AddEventPage />
						</Suspense>
					}
				/>
				<Route
					path='/Event'
					element={
						<Suspense fallback={<Spinner />}>
							<EventPage />
						</Suspense>
					}
				/>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

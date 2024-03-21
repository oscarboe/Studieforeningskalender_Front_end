import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import KalenderPage from './pages/KalenderPage/KalenderPage';
import HomePage from './pages/HomePage/HomePage';
import { useState } from 'react';

export default function App() {
	const [sortPopular, setSortPopular] = useState(true);

	return (
		<BrowserRouter>
			<Navbar setSortPopular={setSortPopular} />
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/kalender' element={<KalenderPage />}></Route>
				<Route path='/' element={<HomePage sortPopular={sortPopular} />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

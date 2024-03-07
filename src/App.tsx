import { ALL_USERS_QUERY } from '../public/UserQueries';
import './App.css';
import { useLazyQuery } from '@apollo/client';
import Navbar from './Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import KalenderPage from './pages/KalenderPage';

export default function App() {
  const [allUsers, { data, loading, error }] = useLazyQuery(ALL_USERS_QUERY, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  if (loading) return 'Loading...';
  if (error) {
    console.log(error);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/kalender' element={<KalenderPage />}></Route>
        <Route path='/'></Route>
      </Routes>
    </BrowserRouter>
  );
}

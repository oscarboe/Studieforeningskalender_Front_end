import './App.css';
import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { UserTokenPayload } from '../public/Models/UserPayload';
import { LOGIN_QUERY } from './Queries/UserQueries';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const [login, { data, loading, error }] = useMutation(LOGIN_QUERY, {
    variables: { username: username, password: password },
    onCompleted: (data: UserTokenPayload) => {
      console.log(data.login);
    },
  });

  if (loading) return 'Loading...';
  if (error) {
    console.log(error);
    return <pre>{error.message}</pre>;
  }

  return (
    <div style={{ border: '0.1rem solid red' }}>
      <input
        id='username'
        value={username}
        onChange={handleUsernameChange}
      ></input>
      <input
        id='password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault;
          login();
        }}
      >
        Login
      </button>
    </div>
  );
}

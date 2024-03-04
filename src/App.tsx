import { ALL_USERS_QUERY } from '../public/UserQueries';
import './App.css';
import { useLazyQuery } from '@apollo/client';

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
    <div>
      <button onClick={() => allUsers()}>Get all users</button>
    </div>
  );
}

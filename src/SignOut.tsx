import './App.css';
import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_OUT_QUERY } from './Queries/UserQueries';

export default function SignOut() {
  const client = useApolloClient();

  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT_QUERY, {
    onCompleted: (data) => {
      console.log(data);
      client.resetStore();
    },
  });

  if (loading) return 'Loading...';
  if (error) {
    console.log(error);
    return <pre>{error.message}</pre>;
  }

  return (
    <div style={{ border: '0.1rem solid red' }}>
      <button
        onClick={(e) => {
          e.preventDefault;
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

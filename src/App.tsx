import './App.css';
import { gql, useQuery } from '@apollo/client';

const BOOK_QUERY = gql`
  {
    book {
      title
      author {
        name
      }
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(BOOK_QUERY);

  if (loading) return 'Loading...';
  if (error) {
    console.log(error);
    return <pre>{error.message}</pre>;
  }

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {data.book.map((launch: any) => (
          <li key={launch.id}>{launch.title}</li>
        ))}
      </ul>
    </div>
  );
}

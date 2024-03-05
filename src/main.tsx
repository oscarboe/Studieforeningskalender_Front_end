import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Login from './Login.tsx';
import SignOut from './SignOut.tsx';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://backend.studieforeningskalender.com/graphql/',
    // uri: 'http://localhost:5022/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <Login />
    <SignOut />
    <App />
  </ApolloProvider>,
  rootElement
);

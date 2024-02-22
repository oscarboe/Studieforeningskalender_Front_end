import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://studieforeningskalenderbackend-dev.eba-id4fqmps.eu-north-1.elasticbeanstalk.com/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);

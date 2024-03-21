import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

var uri = 'https://backend.studieforeningskalender.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') uri = 'http://localhost:5022/graphql';

const client = new ApolloClient({
	link: new HttpLink({
		uri: uri,
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
		<App />
	</ApolloProvider>,
	rootElement
);

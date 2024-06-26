import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App.tsx';

import { Provider } from 'react-redux';
import store from './Redux/store';

var uri = 'https://backend.studieforeningskalender.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') uri = 'http://localhost:5022/graphql';

const client = new ApolloClient({
	link: createUploadLink({
		uri: uri,
		headers: {
			'Content-Type': 'application/json',
			'GraphQL-Preflight': '1',
		},
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
});
const rootElement = document.getElementById('root');
ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	rootElement
);

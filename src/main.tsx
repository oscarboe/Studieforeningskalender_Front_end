import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App.tsx';

import { Provider } from 'react-redux';
import store from './Redux/store';
import { getFacebookLoginStatus, initFacebookSdk } from './Helpers/facebook.ts';

var uri = 'https://backend.studieforeningskalender.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') uri = 'http://localhost:5022/graphql';

const client = new ApolloClient({
	link: new createUploadLink({
		uri: uri,
		headers: {
			'Content-Type': 'application/json',
			'GraphQL-Preflight': 'true',
		},
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
});
initFacebookSdk();
getFacebookLoginStatus();
const rootElement = document.getElementById('root');
ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	rootElement
);

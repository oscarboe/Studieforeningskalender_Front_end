import { ApolloError } from '@apollo/client';

export default function GetErrorMessage(error: ApolloError): string {
	switch (error.message) {
		case 'Failed to fetch':
			return 'Could not connect to the server, try again later.';
		default:
			return 'An unknown error occurred.';
	}
}

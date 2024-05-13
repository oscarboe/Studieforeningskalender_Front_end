import { ApolloError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import { alert } from '../Redux/Slices/alertsSlice';

export default function GetErrorMessage(error: ApolloError): string {
	switch (error.message) {
		case 'Failed to fetch':
			return 'Could not connect to the server, try again later.';
		default:
			return 'An unknown error occurred.';
	}
}

export function GetErrorAlerts(errors: GraphQLErrors): alert[] {
	let alerts: alert[] = [];

	errors.forEach((error) => {
		alerts.push({ message: error.message, severity: 'error' });
	});

	return alerts;
}

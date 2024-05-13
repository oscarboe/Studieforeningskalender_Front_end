import { UnknownAction, Dispatch } from 'redux';
import { addAlert, setAlerts } from '../Redux/Slices/alertsSlice';
import { ApolloError } from '@apollo/client';
import GetErrorMessage, { GetErrorAlerts } from './ErrorMessageHelper';
import { GraphQLErrors } from '@apollo/client/errors';

export const HandleGraphQLSuccess = (
	{ isSuccessful, message }: dataType,
	dispatch: Dispatch<UnknownAction>,
	messageKey: keyof typeof standardMessages
) => {
	if (!isSuccessful) {
		dispatch(setAlerts([{ message: message, severity: 'error' }]));
	} else {
		dispatch(setAlerts([{ message: standardMessages[messageKey], severity: 'success' }]));

		if (message != standardMessages[messageKey]) dispatch(addAlert({ message: message, severity: 'warning' }));
	}
};

export const HandleGraphQLError = (error: ApolloError, dispatch: Dispatch<UnknownAction>) => {
	dispatch(addAlert({ message: GetErrorMessage(error), severity: 'error' }));
};

export const HandleGraphQLValidationError = (errors: GraphQLErrors, dispatch: Dispatch<UnknownAction>) => {
	dispatch(setAlerts(GetErrorAlerts(errors)));
};

export const standardMessages = {
	verifyUser: 'User was verified successfully',
	sendVerificationEmail: 'The verification email was successfully sent',
	createUser: 'Created user successfully',
	login: 'Logged in successfully',
	changePassword: 'Password was changed successfully',
	deleteUser: 'Deleted user successfully',
	updateUser: 'Updated user successfully',
	addUserToEvent: 'User successfully added to event',
	createEvent: 'Created event successfully',
};

interface dataType {
	isSuccessful: boolean;
	message: string;
}

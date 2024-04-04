import { UnknownAction, Dispatch } from 'redux';
import { addAlert } from '../Redux/Slices/alertsSlice';
import { ApolloError } from '@apollo/client';
import GetErrorMessage from './ErrorMessageHelper';

export const HandleGraphQLSuccess = (
	{ isSuccessful, message }: dataType,
	dispatch: Dispatch<UnknownAction>,
	messageKey: keyof typeof standardMessages
) => {
	if (!isSuccessful) {
		dispatch(addAlert({ message: message, severity: 'error' }));
	} else {
		dispatch(addAlert({ message: standardMessages[messageKey], severity: 'success' }));

		if (message != standardMessages[messageKey]) dispatch(addAlert({ message: message, severity: 'warning' }));
	}
};

export const HandleGraphQLError = (error: ApolloError, dispatch: Dispatch<UnknownAction>) => {
	dispatch(addAlert({ message: GetErrorMessage(error), severity: 'error' }));
	console.log(error.message);
};

export const standardMessages = {
	verifyUser: 'User was verified successfully',
	sendVerificationEmail: 'The verification email was successfully sent',
	createUser: 'Created user successfully',
	login: 'Logged in successfully',
	changePassword: 'Password was changed successfully',
};

interface dataType {
	isSuccessful: boolean;
	message: string;
}

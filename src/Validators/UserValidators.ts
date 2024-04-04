import { CreateUserInput, LoginMutationVariables } from '../../generated/graphql/graphql';
import { alert } from '../Redux/Slices/alertsSlice';

export function ValidateCreateUserInput(input: CreateUserInput, confirmPassword: string): alert[] {
	const { firstName, lastName, userName, password, emailAddress } = input;
	var errors: alert[] = [];

	errors = errors.concat(validateUsername(userName, 'register', createUserFields.userName));
	errors = errors.concat(validatePassword(password, 'register', createUserFields.password));
	errors = errors.concat(ValidateEmailAddress(emailAddress, 'register', createUserFields.emailAddress));

	if (firstName.length < 1 || firstName.length > 50)
		errors.push({
			field: createUserFields.firstName,
			message: 'First name must be between 1 and 50 characters',
			severity: 'error',
			component: 'register',
		});
	if (lastName.length < 1 || lastName.length > 50)
		errors.push({
			field: createUserFields.lastName,
			message: 'Last name must be between 1 and 50 characters',
			severity: 'error',
			component: 'register',
		});

	if (password !== confirmPassword && firstEntry(errors, createUserFields.confirmPassword))
		errors.push({
			field: createUserFields.confirmPassword,
			message: 'Password confirmation does not match the original password',
			severity: 'error',
			component: 'register',
		});

	return errors;
}

export function ValidateLoginInput(input: LoginMutationVariables): alert[] {
	const { username, password } = input;
	var errors: alert[] = [];

	errors = errors.concat(validateUsername(username, 'login', loginFields.username));
	errors = errors.concat(validatePassword(password, 'login', loginFields.password));

	return errors;
}

// Change verification code validations when we know what they are
export function ValidatePasswordReset(verificationCode: string, password: string, email: string): alert[] {
	const component = 'passwordReset';
	var errors: alert[] = [];

	var tokenError = ValidateToken(verificationCode, component, passwordResetFields.verificationCode);
	if (tokenError.length > 0) return tokenError;

	errors = errors.concat(ValidateEmailAddress(email, component, passwordResetFields.email));
	errors = errors.concat(validatePassword(password, component, passwordResetFields.password));

	return errors;
}

function firstEntry(errors: alert[], field: string): boolean {
	return errors.find((x) => x.field == field) === undefined;
}

function validateUsername(username: string, component: string, field: string): alert[] {
	var errors: alert[] = [];

	if (username.length < 1 || username.length > 64)
		errors.push({
			field: field,
			message: 'Username must be between 1 and 64 characters',
			severity: 'error',
			component: component,
		});

	if (username.includes(' ') && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Username cannot contain spaces',
			severity: 'error',
			component: component,
		});

	return errors;
}

function validatePassword(password: string, component: string, field: string): alert[] {
	var errors: alert[] = [];

	if (password.length < 8 || password.length > 255)
		errors.push({
			field: field,
			message: 'Password must be between 8 and 255 characters',
			severity: 'error',
			component: component,
		});

	if (password === password.toLocaleLowerCase() && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Password must contain an uppercase character',
			severity: 'error',
			component: component,
		});

	if (password.includes(' ') && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Password cannot contain spaces',
			severity: 'error',
			component: component,
		});

	return errors;
}

export function ValidateEmailAddress(emailAddress: string, component: string, field: string): alert[] {
	var errors: alert[] = [];

	if (emailAddress.length < 11 || emailAddress.length > 100)
		errors.push({
			field: field,
			message: 'Email address must be between 11 and 100 characters',
			severity: 'error',
			component: component,
		});

	if (!emailAddress.includes('@post.au.dk') && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Email address must be an au email and end with @post.au.dk',
			severity: 'error',
			component: component,
		});
	if (emailAddress.slice(0, emailAddress.indexOf('@')) === '' && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Email address must have address before @',
			severity: 'error',
			component: component,
		});

	if (emailAddress.includes(' ') && firstEntry(errors, field))
		errors.push({
			field: field,
			message: 'Email address cannot contain spaces',
			severity: 'error',
			component: component,
		});

	return errors;
}

export function ValidateToken(token: string, component: string, field: string): alert[] {
	if (token.length < 1 || token.length > 255 || token.includes(' '))
		return [
			{
				field: field,
				message: 'You must be using a valid verification code to change password',
				severity: 'error',
				component: component,
			},
		];

	return [];
}

enum createUserFields {
	firstName = 'firstName',
	lastName = 'lastName',
	userName = 'userName',
	password = 'password',
	confirmPassword = 'confirmPassword',
	emailAddress = 'emailAddress',
}

enum loginFields {
	username = 'username',
	password = 'password',
}

enum passwordResetFields {
	email = 'emailAddress',
	verificationCode = 'verificationCode',
	password = 'password',
}

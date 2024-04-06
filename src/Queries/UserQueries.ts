import { gql } from '../../generated/graphql';

export const LOGIN_QUERY = gql(`
	mutation Login($username: String!, $password: String!, $rememberMe: Boolean!, $recaptchaToken: String!) {
		login(loginInput: { userName: $username, password: $password, rememberMe: $rememberMe, recaptchaToken: $recaptchaToken }) {
			isSuccessful
			message
		}
	}
`);

export const REGISTER_QUERY = gql(`
	mutation CreateUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			isSuccessful
			message
		}
	}
`);

export const SIGN_OUT_QUERY = gql(`
	mutation SignOut {
		signOut
	}
`);

export const CHANGE_PASSWORD_QUERY = gql(`
	mutation ChangePassword($changePassword: ChangePasswordInput!) {
		changePassword(input: $changePassword) {
			isSuccessful
			message
		}
	}
`);

export const VERIFY_USER = gql(`
	mutation VerifyUser($verifyUserInput: VerifyUserInput!) {
		verifyUser(input: $verifyUserInput) {
			isSuccessful
			message
		}
	}
`);

import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
	mutation Login($username: String!, $password: String!) {
		login(loginInput: { userName: $username, password: $password }) {
			isSuccessful
			message
		}
	}
`;

export const REGISTER_QUERY = gql`
	mutation CreateUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			isSuccessfull
			message
		}
	}
`;

export const SIGN_OUT_QUERY = gql`
	mutation SignOut {
		signOut
	}
`;

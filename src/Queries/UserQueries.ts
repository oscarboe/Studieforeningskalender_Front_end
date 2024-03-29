import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
	mutation Login($username: String!, $password: String!) {
		login(loginInput: { userName: $username, password: $password }) {
			accessToken
			refreshToken
		}
	}
`;

export const SIGN_OUT_QUERY = gql`
	mutation SignOut {
		signOut
	}
`;

export const ALL_USERS_QUERY = gql`
	query Users {
		users {
			id
			userName
			firstName
			lastName
		}
	}
`;

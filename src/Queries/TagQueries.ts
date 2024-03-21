import { gql } from '@apollo/client';

export const GET_ALL_TAGS = gql`
	query Tags {
		tags {
			id
			name
		}
	}
`;

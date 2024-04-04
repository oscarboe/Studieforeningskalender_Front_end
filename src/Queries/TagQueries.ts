import { gql } from '../../generated/graphql';

export const GET_ALL_TAGS = gql(`
	query Tags {
		tags {
			id
			name
		}
	}
`);

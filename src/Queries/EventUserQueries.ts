import { gql } from '../../generated/graphql';

export const ADD_SELF_TO_EVENT = gql(`
    mutation AddSelf($addSelfInput: AddSelfToEventInput!) {
        addSelfToEvent(input: $addSelfInput) {
            isSuccessful
            message
        }
    }
`);

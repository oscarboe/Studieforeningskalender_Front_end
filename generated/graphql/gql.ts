/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\timage\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n": types.BigEventsForHomeDocument,
    "\n\tquery SliderEventsForHome($sorting: String, $tags: [String!], $searchText: String, $take: Int, $skip: Int) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: $take, skip: $skip) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tmediumImage\n\t\t\t}\n\t\t}\n\t}\n": types.SliderEventsForHomeDocument,
    "\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.TagsDocument,
    "\n\tmutation Login($username: String!, $password: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessfull\n\t\t\tmessage\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tmutation SignOut {\n\t\tsignOut\n\t}\n": types.SignOutDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\timage\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\timage\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery SliderEventsForHome($sorting: String, $tags: [String!], $searchText: String, $take: Int, $skip: Int) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: $take, skip: $skip) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tmediumImage\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SliderEventsForHome($sorting: String, $tags: [String!], $searchText: String, $take: Int, $skip: Int) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: $take, skip: $skip) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tmediumImage\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Login($username: String!, $password: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Login($username: String!, $password: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessfull\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessfull\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SignOut {\n\t\tsignOut\n\t}\n"): (typeof documents)["\n\tmutation SignOut {\n\t\tsignOut\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
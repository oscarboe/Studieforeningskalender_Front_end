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
    "\n\tmutation SendForgotPasswordVerificationEmail($email: String!, $reCaptchaToken: String!) {\n\t\tsendForgotPasswordVerificationEmail(input: { email: $email, reCaptchaToken: $reCaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.SendForgotPasswordVerificationEmailDocument,
    "\n\tmutation ResendForgotPasswordVerificationEmail {\n\t\tresendRegistrationVerificationEmail {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.ResendForgotPasswordVerificationEmailDocument,
    "\n\tquery BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\timage\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n": types.BigEventsForHomeDocument,
    "\n\tquery SliderEventsForHome($sorting: String, $tags: [String!], $searchText: String, $take: Int, $skip: Int) {\n\t\tevents(sorting: $sorting, tags: $tags, searchText: $searchText, take: $take, skip: $skip) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tmediumImage\n\t\t\t}\n\t\t}\n\t}\n": types.SliderEventsForHomeDocument,
    "\n\tquery CalendarEvents($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage: smallImage\n\t\t\t}\n\t\t}\n\t}\n": types.CalendarEventsDocument,
    "\n\tquery CalendarEventsBigImage($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage\n\t\t\t}\n\t\t}\n\t}\n": types.CalendarEventsBigImageDocument,
    "\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.TagsDocument,
    "\n\tmutation Login($username: String!, $password: String!, $rememberMe: Boolean!, $recaptchaToken: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password, rememberMe: $rememberMe, recaptchaToken: $recaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tmutation SignOut {\n\t\tsignOut\n\t}\n": types.SignOutDocument,
    "\n\tmutation ChangePassword($changePassword: ChangePasswordInput!) {\n\t\tchangePassword(input: $changePassword) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.ChangePasswordDocument,
    "\n\tmutation VerifyUser($verifyUserInput: VerifyUserInput!) {\n\t\tverifyUser(input: $verifyUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.VerifyUserDocument,
    "\n\tquery ValidateSession {\n\t\tvalidateSession\n\t}\n": types.ValidateSessionDocument,
    "\n\tquery GetUser {\n\t\tuserInfo {\n\t\t\tuserName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temailAddress\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tmutation UpdateUser($updateUser: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUser) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.UpdateUserDocument,
    "\n\tmutation DeleteUser {\n\t\tdeleteUser {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n": types.DeleteUserDocument,
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
export function gql(source: "\n\tmutation SendForgotPasswordVerificationEmail($email: String!, $reCaptchaToken: String!) {\n\t\tsendForgotPasswordVerificationEmail(input: { email: $email, reCaptchaToken: $reCaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SendForgotPasswordVerificationEmail($email: String!, $reCaptchaToken: String!) {\n\t\tsendForgotPasswordVerificationEmail(input: { email: $email, reCaptchaToken: $reCaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ResendForgotPasswordVerificationEmail {\n\t\tresendRegistrationVerificationEmail {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ResendForgotPasswordVerificationEmail {\n\t\tresendRegistrationVerificationEmail {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
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
export function gql(source: "\n\tquery CalendarEvents($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage: smallImage\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery CalendarEvents($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage: smallImage\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery CalendarEventsBigImage($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery CalendarEventsBigImage($startTime: DateTime!, $endTime: DateTime!) {\n\t\tevents(\n\t\t\twhere: {\n\t\t\t\tor: [\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { gte: $startTime } }\n\t\t\t\t\t{ startTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ endTime: { gte: $startTime } }\n\t\t\t\t\t{ endTime: { lte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tand: [\n\t\t\t\t\t{ startTime: { lte: $startTime } }\n\t\t\t\t\t{ endTime: { gte: $endTime } }\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t\torder: { startTime: ASC }\n\t\t\ttake: 50\n\t\t) {\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tstartTime\n\t\t\t\tendTime\n\t\t\t\timage\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Tags {\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Login($username: String!, $password: String!, $rememberMe: Boolean!, $recaptchaToken: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password, rememberMe: $rememberMe, recaptchaToken: $recaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Login($username: String!, $password: String!, $rememberMe: Boolean!, $recaptchaToken: String!) {\n\t\tlogin(loginInput: { userName: $username, password: $password, rememberMe: $rememberMe, recaptchaToken: $recaptchaToken }) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SignOut {\n\t\tsignOut\n\t}\n"): (typeof documents)["\n\tmutation SignOut {\n\t\tsignOut\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ChangePassword($changePassword: ChangePasswordInput!) {\n\t\tchangePassword(input: $changePassword) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ChangePassword($changePassword: ChangePasswordInput!) {\n\t\tchangePassword(input: $changePassword) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation VerifyUser($verifyUserInput: VerifyUserInput!) {\n\t\tverifyUser(input: $verifyUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation VerifyUser($verifyUserInput: VerifyUserInput!) {\n\t\tverifyUser(input: $verifyUserInput) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ValidateSession {\n\t\tvalidateSession\n\t}\n"): (typeof documents)["\n\tquery ValidateSession {\n\t\tvalidateSession\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUser {\n\t\tuserInfo {\n\t\t\tuserName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temailAddress\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser {\n\t\tuserInfo {\n\t\t\tuserName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temailAddress\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUser($updateUser: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUser) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($updateUser: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUser) {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeleteUser {\n\t\tdeleteUser {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteUser {\n\t\tdeleteUser {\n\t\t\tisSuccessful\n\t\t\tmessage\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
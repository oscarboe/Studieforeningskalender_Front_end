/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
  Byte: { input: any; output: any; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ByteOperationFilterInput = {
  eq?: InputMaybe<Scalars['Byte']['input']>;
  gt?: InputMaybe<Scalars['Byte']['input']>;
  gte?: InputMaybe<Scalars['Byte']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Byte']['input']>>>;
  lt?: InputMaybe<Scalars['Byte']['input']>;
  lte?: InputMaybe<Scalars['Byte']['input']>;
  neq?: InputMaybe<Scalars['Byte']['input']>;
  ngt?: InputMaybe<Scalars['Byte']['input']>;
  ngte?: InputMaybe<Scalars['Byte']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Byte']['input']>>>;
  nlt?: InputMaybe<Scalars['Byte']['input']>;
  nlte?: InputMaybe<Scalars['Byte']['input']>;
};

export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type CreateUserInput = {
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type Event = Node & {
  __typename?: 'Event';
  creation: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  eventTags: Array<EventTag>;
  eventUsers: Array<EventUser>;
  id: Scalars['ID']['output'];
  image: Array<Scalars['Byte']['output']>;
  mediumImage: Array<Scalars['Byte']['output']>;
  smallImage: Array<Scalars['Byte']['output']>;
  title: Scalars['String']['output'];
};

export type EventFilterInput = {
  and?: InputMaybe<Array<EventFilterInput>>;
  creation?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  eventTags?: InputMaybe<ListFilterInputTypeOfEventTagFilterInput>;
  eventUsers?: InputMaybe<ListFilterInputTypeOfEventUserFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  image?: InputMaybe<ListByteOperationFilterInput>;
  mediumImage?: InputMaybe<ListByteOperationFilterInput>;
  or?: InputMaybe<Array<EventFilterInput>>;
  smallImage?: InputMaybe<ListByteOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type EventInput = {
  creation: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  eventTags: Array<EventTagInput>;
  eventUsers: Array<EventUserInput>;
  id: Scalars['ID']['input'];
  image: Array<Scalars['Byte']['input']>;
  mediumImage: Array<Scalars['Byte']['input']>;
  smallImage: Array<Scalars['Byte']['input']>;
  title: Scalars['String']['input'];
};

export type EventTag = Node & {
  __typename?: 'EventTag';
  event: Event;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  tag: Tag;
  tagId: Scalars['ID']['output'];
};

export type EventTagFilterInput = {
  and?: InputMaybe<Array<EventTagFilterInput>>;
  event?: InputMaybe<EventFilterInput>;
  eventId?: InputMaybe<IdOperationFilterInput>;
  or?: InputMaybe<Array<EventTagFilterInput>>;
  tag?: InputMaybe<TagFilterInput>;
  tagId?: InputMaybe<IdOperationFilterInput>;
};

export type EventTagInput = {
  event: EventInput;
  eventId: Scalars['ID']['input'];
  tag: TagInput;
  tagId: Scalars['ID']['input'];
};

export type EventUser = Node & {
  __typename?: 'EventUser';
  event: Event;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type EventUserFilterInput = {
  and?: InputMaybe<Array<EventUserFilterInput>>;
  event?: InputMaybe<EventFilterInput>;
  eventId?: InputMaybe<IdOperationFilterInput>;
  isAdmin?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<EventUserFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IdOperationFilterInput>;
};

export type EventUserInput = {
  event: EventInput;
  eventId: Scalars['ID']['input'];
  isAdmin: Scalars['Boolean']['input'];
  user: UserInput;
  userId: Scalars['ID']['input'];
};

export type IdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ListByteOperationFilterInput = {
  all?: InputMaybe<ByteOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ByteOperationFilterInput>;
  some?: InputMaybe<ByteOperationFilterInput>;
};

export type ListFilterInputTypeOfEventTagFilterInput = {
  all?: InputMaybe<EventTagFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EventTagFilterInput>;
  some?: InputMaybe<EventTagFilterInput>;
};

export type ListFilterInputTypeOfEventUserFilterInput = {
  all?: InputMaybe<EventUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EventUserFilterInput>;
  some?: InputMaybe<EventUserFilterInput>;
};

export type ListFilterInputTypeOfUserRoleFilterInput = {
  all?: InputMaybe<UserRoleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserRoleFilterInput>;
  some?: InputMaybe<UserRoleFilterInput>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: CreateRolePayload;
  createUser: CreateUserPayload;
  deleteRole: DeleteRolePayload;
  deleteUser: DeleteUserPayload;
  grantRoleToUser: UserRolesPayload;
  login: UserTokenPayload;
  removeRoleFromUser: UserRolesPayload;
  renewAccessToken: UserTokenPayload;
  signOut?: Maybe<Scalars['String']['output']>;
  updateUser: UpdateUserPayload;
};


export type MutationCreateRoleArgs = {
  input: RoleNameInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteRoleArgs = {
  input: RoleNameInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationGrantRoleToUserArgs = {
  input: RoleAndUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveRoleFromUserArgs = {
  input: RoleAndUserInput;
};


export type MutationRenewAccessTokenArgs = {
  renewTokenInput: RenewTokenInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  allRoles: Array<Role>;
  allUsers: Array<User>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  roles: Array<Role>;
  test: Scalars['String']['output'];
  userById?: Maybe<User>;
};


export type QueryAllRolesArgs = {
  order?: InputMaybe<Array<RoleSortInput>>;
  where?: InputMaybe<RoleFilterInput>;
};


export type QueryAllUsersArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryRolesArgs = {
  order?: InputMaybe<Array<RoleSortInput>>;
  userRole: Array<UserRoleInput>;
  where?: InputMaybe<RoleFilterInput>;
};


export type QueryUserByIdArgs = {
  id: Scalars['UUID']['input'];
};

export type RenewTokenInput = {
  accessToken: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type Role = Node & {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  userRoles: Array<UserRole>;
};

export type RoleAndUserInput = {
  roleName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RoleFilterInput = {
  and?: InputMaybe<Array<RoleFilterInput>>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
  userRoles?: InputMaybe<ListFilterInputTypeOfUserRoleFilterInput>;
};

export type RoleInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  userRoles: Array<UserRoleInput>;
};

export type RoleNameInput = {
  roleName: Scalars['String']['input'];
};

export type RoleSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  eventTags: Array<EventTag>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TagFilterInput = {
  and?: InputMaybe<Array<TagFilterInput>>;
  eventTags?: InputMaybe<ListFilterInputTypeOfEventTagFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TagFilterInput>>;
};

export type TagInput = {
  eventTags: Array<EventTagInput>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type User = Node & {
  __typename?: 'User';
  emailAddress: Scalars['String']['output'];
  eventUsers: Array<EventUser>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiration?: Maybe<Scalars['DateTime']['output']>;
  userName: Scalars['String']['output'];
  userRoles: Array<UserRole>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  eventUsers?: InputMaybe<ListFilterInputTypeOfEventUserFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  refreshToken?: InputMaybe<StringOperationFilterInput>;
  refreshTokenExpiration?: InputMaybe<DateTimeOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userRoles?: InputMaybe<ListFilterInputTypeOfUserRoleFilterInput>;
};

export type UserInput = {
  emailAddress: Scalars['String']['input'];
  eventUsers: Array<EventUserInput>;
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  refreshTokenExpiration?: InputMaybe<Scalars['DateTime']['input']>;
  userName: Scalars['String']['input'];
  userRoles: Array<UserRoleInput>;
};

export type UserRole = Node & {
  __typename?: 'UserRole';
  id: Scalars['ID']['output'];
  role: Role;
  roleId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type UserRoleFilterInput = {
  and?: InputMaybe<Array<UserRoleFilterInput>>;
  or?: InputMaybe<Array<UserRoleFilterInput>>;
  role?: InputMaybe<RoleFilterInput>;
  roleId?: InputMaybe<IdOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IdOperationFilterInput>;
};

export type UserRoleInput = {
  role: RoleInput;
  roleId: Scalars['ID']['input'];
  user: UserInput;
  userId: Scalars['ID']['input'];
};

export type UserRolesPayload = {
  __typename?: 'UserRolesPayload';
  isSuccessfull: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type UserSortInput = {
  emailAddress?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  password?: InputMaybe<SortEnumType>;
  refreshToken?: InputMaybe<SortEnumType>;
  refreshTokenExpiration?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
};

export type UserTokenPayload = {
  __typename?: 'UserTokenPayload';
  accessToken: Scalars['String']['output'];
  message: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserTokenPayload', accessToken: string, refreshToken: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, userName: string, firstName: string, lastName: string }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
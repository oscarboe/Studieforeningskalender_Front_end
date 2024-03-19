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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  isSuccessfull: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  isSuccessfull: Scalars['Boolean']['output'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  isSuccessfull: Scalars['Boolean']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: CreateRolePayload;
  createUser: CreateUserPayload;
  deleteRole: CreateRolePayload;
  deleteUser: DeleteUserPayload;
  grantRoleToUser: CreateUserPayload;
  login: UserTokenPayload;
  removeRoleFromUser: CreateUserPayload;
  renewAccessToken: UserTokenPayload;
  updateUser: UpdateUserPayload;
};


export type MutationCreateRoleArgs = {
  roleName: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteRoleArgs = {
  roleName: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationGrantRoleToUserArgs = {
  roleName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveRoleFromUserArgs = {
  roleName: Scalars['String']['input'];
  username: Scalars['String']['input'];
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


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryRolesArgs = {
  userRole: Array<UserRoleInput>;
};


export type QueryUserByIdArgs = {
  id: Scalars['UUID']['input'];
};

export type RenewTokenInput = {
  accessToken: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  userRoles: Array<UserRole>;
};

export type RoleInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  userRoles: Array<UserRoleInput>;
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
};

export type User = Node & {
  __typename?: 'User';
  emailAddress: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiration?: Maybe<Scalars['DateTime']['output']>;
  userName: Scalars['String']['output'];
  userRoles: Array<UserRole>;
};

export type UserInput = {
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  refreshTokenExpiration?: InputMaybe<Scalars['DateTime']['input']>;
  userName: Scalars['String']['input'];
  userRoles: Array<UserRoleInput>;
};

export type UserRole = {
  __typename?: 'UserRole';
  role: Role;
  roleId: Scalars['UUID']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type UserRoleInput = {
  role: RoleInput;
  roleId: Scalars['UUID']['input'];
  user: UserInput;
  userId: Scalars['UUID']['input'];
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


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
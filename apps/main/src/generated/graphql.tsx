import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AuthType {
  Oauth = 'oauth',
  Password = 'password'
}

export type AuthUrls = {
  __typename?: 'AuthUrls';
  discord: Scalars['String'];
  github: Scalars['String'];
  google: Scalars['String'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type ConfirmEmailInput = {
  code: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  clearData: Scalars['Boolean'];
  confirmEmail: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  oauthLogin: User;
  oauthRegister: User;
  register: User;
  sendConfirmation: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationConfirmEmailArgs = {
  input: ConfirmEmailInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationOauthLoginArgs = {
  code: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationOauthRegisterArgs = {
  code: Scalars['String'];
  input: OAuthRegisterInput;
  provider: OAuthProvider;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export enum OAuthProvider {
  Discord = 'discord',
  Github = 'github',
  Google = 'google'
}

export type OAuthRegisterInput = {
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authUrls: AuthUrls;
  healthCheck: Scalars['String'];
  me: User;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  userAgent: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  authType: AuthType;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  emailConfirmed: Scalars['Boolean'];
  id: Scalars['Float'];
  sessions: Array<Session>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type WithPassword = {
  password: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  options: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: number } };

export type ClearDataMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearDataMutation = { __typename?: 'Mutation', clearData: boolean };

export type ConfirmEmailMutationVariables = Exact<{
  options: ConfirmEmailInput;
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, email: string, username: string, emailConfirmed: boolean, createdAt: string, updatedAt: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, email: string, username: string, emailConfirmed: boolean, createdAt: string, updatedAt: string } };

export type SendConfirmationMutationVariables = Exact<{ [key: string]: never; }>;


export type SendConfirmationMutation = { __typename?: 'Mutation', sendConfirmation: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, username: string, emailConfirmed: boolean, createdAt: string, updatedAt: string } };


export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!) {
  changePassword(input: $options) {
    id
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ClearDataDocument = gql`
    mutation ClearData {
  clearData
}
    `;

export function useClearDataMutation() {
  return Urql.useMutation<ClearDataMutation, ClearDataMutationVariables>(ClearDataDocument);
};
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($options: ConfirmEmailInput!) {
  confirmEmail(input: $options)
}
    `;

export function useConfirmEmailMutation() {
  return Urql.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(input: $options) {
    id
    email
    username
    emailConfirmed
    createdAt
    updatedAt
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(input: $options) {
    id
    email
    username
    emailConfirmed
    createdAt
    updatedAt
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendConfirmationDocument = gql`
    mutation SendConfirmation {
  sendConfirmation
}
    `;

export function useSendConfirmationMutation() {
  return Urql.useMutation<SendConfirmationMutation, SendConfirmationMutationVariables>(SendConfirmationDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    emailConfirmed
    createdAt
    updatedAt
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
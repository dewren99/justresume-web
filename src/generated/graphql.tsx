import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getResumeByUserId?: Maybe<Resume>;
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  profile?: Maybe<Profile>;
};


export type QueryGetResumeByUserIdArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUserArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryProfileArgs = {
  userId: Scalars['Float'];
};

export type Resume = {
  __typename?: 'Resume';
  id: Scalars['Float'];
  link?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  resume?: Maybe<Resume>;
  profile?: Maybe<Profile>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Float'];
  aboutMe?: Maybe<Scalars['String']>;
  profileImageLink?: Maybe<Scalars['String']>;
  backgroundImageLink?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  uploadResume: Resume;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  setFullName: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  setAboutMe: Profile;
  setProfileImage: Profile;
};


export type MutationUploadResumeArgs = {
  resume: Scalars['Upload'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetFullNameArgs = {
  text: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationSetAboutMeArgs = {
  text: Scalars['String'];
};


export type MutationSetProfileImageArgs = {
  image: Scalars['Upload'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterUserInput = {
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragmentFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type SetAboutMeMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type SetAboutMeMutation = (
  { __typename?: 'Mutation' }
  & { setAboutMe: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'updatedAt' | 'aboutMe'>
  ) }
);

export type SetFullNameMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type SetFullNameMutation = (
  { __typename?: 'Mutation' }
  & { setFullName: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'updatedAt' | 'firstName' | 'lastName'>
    )> }
  ) }
);

export type UploadResumeMutationVariables = Exact<{
  resume: Scalars['Upload'];
}>;


export type UploadResumeMutation = (
  { __typename?: 'Mutation' }
  & { uploadResume: (
    { __typename?: 'Resume' }
    & Pick<Resume, 'link'>
  ) }
);

export type GetResumeByUserIdQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetResumeByUserIdQuery = (
  { __typename?: 'Query' }
  & { getResumeByUserId?: Maybe<(
    { __typename?: 'Resume' }
    & Pick<Resume, 'link'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>
    & { resume?: Maybe<(
      { __typename?: 'Resume' }
      & Pick<Resume, 'id' | 'link'>
    )>, profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'aboutMe'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  errors {
    ...ErrorFragment
  }
  user {
    ...UserFragment
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
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
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

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
    mutation Register($options: RegisterUserInput!) {
  register(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SetAboutMeDocument = gql`
    mutation SetAboutMe($text: String!) {
  setAboutMe(text: $text) {
    id
    updatedAt
    aboutMe
  }
}
    `;

export function useSetAboutMeMutation() {
  return Urql.useMutation<SetAboutMeMutation, SetAboutMeMutationVariables>(SetAboutMeDocument);
};
export const SetFullNameDocument = gql`
    mutation SetFullName($text: String!) {
  setFullName(text: $text) {
    user {
      id
      username
      updatedAt
      firstName
      lastName
    }
  }
}
    `;

export function useSetFullNameMutation() {
  return Urql.useMutation<SetFullNameMutation, SetFullNameMutationVariables>(SetFullNameDocument);
};
export const UploadResumeDocument = gql`
    mutation UploadResume($resume: Upload!) {
  uploadResume(resume: $resume) {
    link
  }
}
    `;

export function useUploadResumeMutation() {
  return Urql.useMutation<UploadResumeMutation, UploadResumeMutationVariables>(UploadResumeDocument);
};
export const GetResumeByUserIdDocument = gql`
    query GetResumeByUserId($userId: Float!) {
  getResumeByUserId(userId: $userId) {
    link
  }
}
    `;

export function useGetResumeByUserIdQuery(options: Omit<Urql.UseQueryArgs<GetResumeByUserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetResumeByUserIdQuery>({ query: GetResumeByUserIdDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    id
    username
    firstName
    lastName
    email
    resume {
      id
      link
    }
    profile {
      id
      aboutMe
    }
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;
export const REGISTER = gql`
  mutation Register(
    $fullName: String
    $password: String
    $phone: String
    $email: String
    $avatarURL: String
  ) {
    register(
      fullName: $fullName
      password: $password
      phone: $phone
      email: $email
      avatarURL: $avatarURL
    )
  }
`;

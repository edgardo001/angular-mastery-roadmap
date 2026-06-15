import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  createUser: {
    id: string;
    name: string;
    email: string;
  };
}

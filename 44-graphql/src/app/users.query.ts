import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GetUsersResponse {
  users: User[];
}

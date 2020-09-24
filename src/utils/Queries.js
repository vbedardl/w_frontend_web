import { gql } from "@apollo/client";

export const GET_RESIDENTS = gql`
  query($query: String) {
    users(query: $query) {
      id
      name
      email
      phone
      unit {
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation(
    $name: String!
    $password: String!
    $email: String!
    $unit: ID!
    $phone: String!
  ) {
    createUser(
      name: $name
      password: $password
      email: $email
      unit: $unit
      phone: $phone
    ) {
      id
      email
      name
      phone
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      email
      name
    }
  }
`;

export const GET_PACKAGES = gql`
  query {
    packages {
      createdAt
      id
      pickedUp
      owner {
        name
        unit {
          name
        }
      }
    }
  }
`;
export const MARK_AS_PICKEDUP = gql`
  mutation($id: ID!) {
    updatePackage(id: $id, data: { pickedUp: true }) {
      id
      pickedUp
    }
  }
`;

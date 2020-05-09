import { gql } from "apollo-server";

export const userType = gql`
  type User {
    id: String
    username: String
    email: String
    posts: [Post]
  }
`;
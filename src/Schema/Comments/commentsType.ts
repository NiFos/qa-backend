import { gql } from "apollo-server";

export const commentsType = gql`
  type Comment {
    id: String
    author: User
    message: String
    votes: Int
  }
`;
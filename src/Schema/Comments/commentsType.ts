import { gql } from "apollo-server";

export const commentsType = gql`
  type Comment {
    authorId: String
    message: String
    votes: Int
  }
`;
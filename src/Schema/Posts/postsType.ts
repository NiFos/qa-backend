import { gql } from "apollo-server";

export const postsType = gql`
  type Post {
    authorId: String
    title: String
    message: String
    category: String
    comments: [Comment]
  }
`;
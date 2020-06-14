import { gql } from "apollo-server";

export const postsType = gql`
  type Post {
    id: String
    author: User
    title: String
    message: String
    category: String
    comments: [Comment]
  }
`;
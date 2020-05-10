import { gql } from "apollo-server";

export const postsType = gql`
  type Post {
    id: String
    authorId: String
    title: String
    message: String
    category: String
    comments: [Comment]
  }
`;
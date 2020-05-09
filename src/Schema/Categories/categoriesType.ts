import { gql } from "apollo-server";

export const categoriesType = gql`
  type Category {
    posts: [Post]
    hasMore: Boolean!
    cursor: String
  }
`;
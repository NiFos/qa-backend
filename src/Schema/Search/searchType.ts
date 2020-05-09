import { gql } from "apollo-server";

export const searchType = gql`
  type Search {
    posts: [Post]
    hasMore: Boolean
    cursor: String
  }
`;
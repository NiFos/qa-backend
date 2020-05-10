import { gql } from "apollo-server";

export const categoryType = gql`
  type Category {
    title: String
    id: String
    posts: CategoryPosts
  }
  type CategoryPosts {
    posts: [Post]
    hasMore: Boolean!
    cursor: String
  }
`;
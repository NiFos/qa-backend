import { gql } from "apollo-server";

export const categoryType = gql`
  type Category {
    title: String
    id: String
    img: String
    posts(after: String, pageSize: Int): CategoryPosts
  }
  type CategoryPosts {
    posts: [Post]
    hasMore: Boolean!
    cursor: String
  }
`;
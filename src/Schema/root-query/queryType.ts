import { gql } from "apollo-server";

export const RootQuery = gql`
  type RootQuery {
    # User
    Me: Me
    User(id: String): User

    # Posts
    Post(id: String): Post
    Category(id: String, after: String, pageSize: Int): Category

    # Categories
    Categories: [Category]

    # Search
    Search(text: String, pageSize: Int, after: String): Search
  }
`;

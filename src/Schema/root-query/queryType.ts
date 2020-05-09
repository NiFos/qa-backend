import { gql } from "apollo-server";

export const RootQuery = gql`
  enum OauthEnum {
    google
  }

  type RootQuery {
    # User
      Me: Me
      GetOauthUrl(type: OauthEnum): String
      User(id: String): User

    # Posts
      Post(id: String): Post
      Category(id: Int, after: String, pageSize: Int): Category

    # Search
      Search(text: String, pageSize: Int, after: String): Search
  }
`;
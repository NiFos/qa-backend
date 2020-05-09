import { gql } from "apollo-server";

export const inputsType = gql`
  input LoginInput {
      email: String
      password: String
  }
  input RegInput {
    username: String
    email: String
    password: String
  }
  input PostInput {
    title: String
    message: String
    category: Int
    id: String
  }
  input CommentInput {
    id: String
    message: String
  }
`;
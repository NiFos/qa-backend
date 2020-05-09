import { gql } from "apollo-server";

export const meType = gql`
  type Me {
    profile: User
    loggedIn: Boolean
  }
`;
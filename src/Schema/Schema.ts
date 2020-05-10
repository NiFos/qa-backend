import { makeExecutableSchema, gql } from "apollo-server";
import { resolvers } from "./resolvers";
import { RootQuery } from "./root-query/queryType";
import { RootMutation } from "./root-mutation/mutationType";
import { categoriesType } from "./Categories/categoriesType";
import { commentsType } from "./Comments/commentsType";
import { postsType } from "./Posts/postsType";
import { searchType } from "./Search/searchType";
import { userType } from "./User/userType";
import { inputsType } from "./Inputs/inputsType";
import { meType } from "./Me/meType";
import { categoryType } from "./Category/categoryType";

const SchemaDefinition = gql`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,
    inputsType,
    categoriesType,
    categoryType,
    commentsType,
    postsType,
    searchType,
    userType,
    meType
  ],
  resolvers
});
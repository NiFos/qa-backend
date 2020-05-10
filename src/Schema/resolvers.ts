import { RootMutation } from "./root-mutation/mutationResolvers";
import { RootQuery } from "./root-query/queryResolvers";
import { postsResolver } from "./Posts/postsResolver";
import { userResolver } from "./User/userResolver";
import { meResolver } from "./Me/meResolver";
import { categoryResolver } from "./Category/categoryResolver";

export const resolvers = {
  Post: postsResolver,
  User: userResolver,
  Me: meResolver,
  Category: categoryResolver,
  RootMutation,
  RootQuery
}
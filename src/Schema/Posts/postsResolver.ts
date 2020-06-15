import { findComments } from "../../utils/db/Controllers/Comments";
import { getUser } from "../../utils/db/Controllers/Users";

export const postsResolver = {
  comments: async (parent: any, args: any, context: any, info: any) => {
    return await findComments(parent.id);
  },
  author: async (parent: any, args: any, context: any, info: any) => {
    return await getUser(parent.authorId);
  }
};
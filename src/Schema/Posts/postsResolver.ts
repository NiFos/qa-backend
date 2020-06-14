import { findComments } from "../../utils/db/Controllers/Comments";
import { getUser } from "../../utils/db/Controllers/Users";

export const postsResolver = {
  comments: async (parent, args, context, info) => {
    return await findComments(parent.id);
  },
  author: async (parent, args, context, info) => {
    return await getUser(parent.authorId);
  }
};
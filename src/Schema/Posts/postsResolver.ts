import { findComments } from "../../utils/db/Controllers/Comments";

export const postsResolver = {
  comments: async (parent, args, context, info) => {
    return await findComments(parent.id);
  }
};
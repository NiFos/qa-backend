import { getUser } from "../../utils/db/Controllers/Users";

export const commentsResolver = {
  author: async (parent, args, context, info) => {
    return await getUser(parent.authorId);
  }
};
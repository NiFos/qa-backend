import { getUser } from "../../utils/db/Controllers/Users";

export const commentsResolver = {
  author: async (parent: any, args: any, context: any, info: any) => {
    return await getUser(parent.authorId);
  }
};
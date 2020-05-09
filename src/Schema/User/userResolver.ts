import { getUserPosts, getUser } from "../../utils/db/Controllers/Users"

export const userResolver = {
  posts: async (parent, args, context, info) => {
    const { id } = parent;
    return await getUserPosts(id);
  }
}
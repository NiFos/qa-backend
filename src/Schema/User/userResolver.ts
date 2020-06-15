import { getUserPosts, getUser } from "../../utils/db/Controllers/Users"

export const userResolver = {
  posts: async (parent: any, args: any, context: any, info: any) => {
    const { id } = parent;
    return await getUserPosts(id);
  }
}
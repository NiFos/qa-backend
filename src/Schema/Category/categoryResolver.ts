import { getPostsInCategory } from "../../utils/db/Controllers/Posts";

export const categoryResolver = {
  posts: async (parent: any, args: any, context: any, info: any) => {
    const { after, pageSize } = args;
    
    return await getPostsInCategory(parent.id, after || null, pageSize || 5);
  }
};
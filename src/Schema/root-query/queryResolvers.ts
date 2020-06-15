import { getPost, getPostsInCategory } from "../../utils/db/Controllers/Posts";
import { getUser } from "../../utils/db/Controllers/Users";
import { searchPosts } from "../../utils/db/Controllers/Search";
import { getOauthUrl } from "../../controllers/auth";
import { auth } from "../../utils/auth";
import { getCategories, getCategoryById } from "../../utils/db/Controllers/Categories";

export const RootQuery = {
  // Posts
  Post: async (parent: any, args: any, context: any, info: any) => {
    return await getPost(args.id);
  },


  // Categories
  Categories: async (parent: any, args: any, context: any, info: any) => {
    return await getCategories();
  },
  Category: async (parent: any, args: any, context: any, info: any) => {
    const { id } = args;
    
    return await getCategoryById(id);
  },

  // User
  Me: async (parent: any, args: any, context: any, info: any) => {
    if (!context.user) return null;
    return {
      loggedIn: auth.isLoggedIn(context)
    }
  },
  User: async (parent: any, args: any, context: any, info: any) => {
    const { id } = args;
    return await getUser(id);
  },
  GetOauthUrl: async (parent: any, args: any, context: any, info: any) => {
    const { type } = args;
    if (!type) return false;

    return getOauthUrl(type);
  },

  // Search
  Search: async (parent: any, args: any, context: any, info: any) => {
    const { text, after, pageSize } = args;
    return await searchPosts(text, after, pageSize);
  }
};
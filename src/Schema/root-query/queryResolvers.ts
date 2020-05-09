import { getPost, getPostsInCategory } from "../../utils/db/Controllers/Posts";
import { getUser } from "../../utils/db/Controllers/Users";
import { searchPosts } from "../../utils/db/Controllers/Search";
import { getOauthUrl } from "../../controllers/auth";
import { auth } from "../../utils/auth";

export const RootQuery = {
  // Posts
  Post: async (parent, args, context, info) => {
    return await getPost(args.id);
  },
  Category: async (parent, args, context, info) => {
    const { id, after, pageSize } = args;
    return await getPostsInCategory(id, after, pageSize);
  },

  // User
  Me: async (parent, args, context, info) => {
    if (!context.user) return null;
    return {
      loggedIn: auth.isLoggedIn(context)
    }
  },
  User: async (parent, args, context, info) => {
    const { id } = args;
    return await getUser(id);
  },
  GetOauthUrl: async (parent, args, context, info) => {
    const { type } = args;
    if (!type) return false;

    return getOauthUrl(type);
  },

  // Search
  Search: async (parent, args, context, info) => {
    const { text, after, pageSize } = args;
    return await searchPosts(text, after, pageSize);
  }
};
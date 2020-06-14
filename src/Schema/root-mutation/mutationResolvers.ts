import { auth, registration, oauth, generatePassword } from "../../utils/auth";
import {
  createComment,
  updateComment,
  deleteComment,
  upvoteComment
} from "../../utils/db/Controllers/Comments";
import {
  createPost,
  updatePost,
  deletePost
} from "../../utils/db/Controllers/Posts";
import { loginUser } from "../../controllers/auth";
import { createCategory } from "../../utils/db/Controllers/Categories";

export const RootMutation = {
  // User
  Login: async (parent, args, context, info) => {
    const { email, password } = args.data;
    if (!email || !password) return null;

    const response = await loginUser(email, password);
    if (!response) return null;

    auth.login(response.id, context.res);
    return response.id;
  },
  Reg: async (parent, args, context, info) => {
    const { username, email, password } = args.data;
    if (!email || !password || !username) return null;

    const response = await registration(context, username, email, password);
    if (response.valid === false) return null;

    return response.id;
  },
  LoginOauth: async (parent, args, context, info) => {
    const { token } = args;

    if (!token) return false;
    const { data } = await oauth.google.getUserInfo(token);
    const response = await registration(context, data.email, data.email, generatePassword());

    return response;
  },

  // Posts
  CreatePost: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await createPost(args.data, context.user.id);
  },
  UpdatePost: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await updatePost(args.data);
  },
  DeletePost: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await deletePost(args.id);
  },

  // Category
  CreateCategory: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    const { title, img } = args;
    return await createCategory(title, img);
  },


  // Comments
  CreateComment: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await createComment(args.data, context.user.id);
  },
  UpdateComment: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await updateComment(args.data);
  },
  DeleteComment: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    return await deleteComment(args.id);
  },
  UpvoteComment: async (parent, args, context, info) => {
    if (!auth.isLoggedIn(context)) return null;

    const { id, up } = args;
    return await upvoteComment(id, up, context.user.id);
  }
};
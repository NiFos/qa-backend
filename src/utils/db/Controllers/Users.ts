import { User } from "../Models/user";
import { Post } from "../Models/post";

export async function getUser(id: string) {
  return await User.findById(id)
}
export async function getUserPosts(id: string) {
  return await Post.find({ authorId: id });
}
import { Post } from "../Models/post";
import { postsCursorMore } from "./Posts";

export async function searchPosts(text: string, after: string, pageSize: number) {
  let posts = [];
  if (after) {
    posts = await Post.find({ title: { $regex: text, $options: 'i' }, _id: { $gt: after } }).limit(pageSize + 1);
  } else {
    posts = await Post.find({ title: { $regex: text, $options: 'i' } }).limit(pageSize + 1);
  }
  return postsCursorMore(posts, pageSize);
}
import { Post } from "../Models/post";

export async function getPost(id: string) {
  const post = await Post.findById(id);
  return post;
}

export async function getPostsInCategory(id: string, after: string, pageSize: number) {
  let posts = [];
  if (after) {
    posts = await Post.find({ category: id, _id: { $gt: after } }).limit(pageSize + 1);
  } else {
    posts = await Post.find({ category: id }).limit(pageSize + 1);
  }
  return postsCursorMore(posts, pageSize);
}

export function postsCursorMore(posts: any[], pageSize: number) {
  const hasMore = posts.length > pageSize;
  const newPosts = hasMore ? posts.slice(0, -1) : posts
  
  return {
    posts: newPosts,
    cursor: posts.length
      ? hasMore
        ? newPosts[newPosts.length - 2]._id
        : newPosts[newPosts.length - 1]._id
      : null,
    hasMore
  }
}


interface IPostData {
  title: string,
  message: string,
  category: string,
  id?: string
}
export async function createPost(data: IPostData, userId: string) {
  const { title, message, category } = data;

  const post = new Post();
  post.authorId = userId;
  post.title = title;
  post.message = message;
  post.category = category;

  await post.save();
  return post._id;
}

export async function updatePost(data: IPostData) {
  const { id, title, message, category } = data;
  const response = await Post.findByIdAndUpdate(id, {
    title,
    message,
    category
  });

  return response._id;
}

export async function deletePost(id: string) {
  const post = await Post.findById(id);
  await post.removeComments();
  await post.remove();
  return {
    valid: true
  }
}

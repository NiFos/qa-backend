import { Comment } from "../Models/comment";
import { User } from "../Models/user";


export async function findComments(postId: string) {
  return await Comment.find({ postId });
}


interface ICommentData {
  id: string,
  message: string
}

/**
 * 
 * @param data id post and message
 * @param userId user id who send 
 */
export async function createComment(data: ICommentData, userId) {
  const { id, message } = data;
  const comment = new Comment();
  comment.authorId = userId;
  comment.postId = id;
  comment.message = message;

  await comment.save();
  return comment._id;
}

export async function updateComment(data: ICommentData) {
  const { id, message } = data;
  await Comment.findByIdAndUpdate(id, {
    message
  });
  return id;
}

export async function deleteComment(id: string) {
  await Comment.findByIdAndRemove(id);
  return id;
}

export async function upvoteComment(id: string, up: boolean, userId: string) {
  const user = await User.findById(userId);
  const userLikeThisComment = user.votes.filter((item) => (item.id === id));
  const newVote = {
    id,
    up
  };

  if (userLikeThisComment.length > 0) return null;
  await user.update({
    $push: {
      votes: newVote
    }
  })
  await Comment.findByIdAndUpdate(id, {
    $inc: { votes: up ? 1 : -1 }
  });
  return id;
}
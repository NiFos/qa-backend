import { Schema, model, Document } from "mongoose";
import { Comment, IComment } from "./comment";

const postsCollection = 'Posts';

export interface IPost extends Document {
  title: string,
  authorId: string,
  message: string,
  category: string,
  comments: IComment[],
  removeComments: () => Promise<null>
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

postSchema.statics.removeComments = async function () {
  await Comment.find({ postId: this._id }).remove();
}

export const Post = model<IPost>('Post', postSchema, postsCollection);


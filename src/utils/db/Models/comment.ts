import { Schema, model, Document } from "mongoose";

const commentsCollection = 'Comments';

export interface IComment extends Document {
  authorId: string,
  message: string,
  postId: string,
  votes: number
}

const commentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  votes: {
    type: Number
  }
});

export const Comment = model<IComment>('Comment', commentSchema, commentsCollection);

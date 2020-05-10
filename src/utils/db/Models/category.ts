import { Schema, model, Document } from "mongoose";

const categoryCollection = 'Categories';

export interface ICategory extends Document {
  title: string,
  img: string
}

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

export const Category = model<ICategory>('Category', categorySchema, categoryCollection);

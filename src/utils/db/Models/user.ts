import { Schema, model, Document } from "mongoose";
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

const userCollection = 'Users';
const salt = 3;

export interface IUser extends Document {
  id?: string,
  username: string,
  email: string,
  password: string,
  votes: [{
    id: string,
    up: boolean
  }],
  generateHashPassword: (password: string) => string,
  validPassword: (password: string) => boolean
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  votes: {
    type: [Object]
  }
});

userSchema.methods.generateHashPassword = function (password: string) {
  return hashSync(password, genSaltSync(salt));
}
userSchema.methods.validPassword = function (password: string) {
  return compareSync(password, this.password);
}


export const User = model<IUser>('User', userSchema, userCollection);

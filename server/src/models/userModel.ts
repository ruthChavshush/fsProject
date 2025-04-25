import { User } from '@shared/types/user.type';
import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

type IUser = Document & User & { password: string };

const userSchema: Schema<IUser> = new Schema({
  _id: { type: String, default: uuidv4, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  password: { type: String, required: true },
  tokens: { type: [String], default: null },
});

export default model<IUser>('User', userSchema);

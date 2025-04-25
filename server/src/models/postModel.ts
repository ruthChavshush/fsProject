import { Post } from '@shared/types/post.type';
import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CommentSchema } from './commentModel';

type IPost = Document & Post;

const PostSchema: Schema = new Schema<IPost>({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  _id: { type: String, required: true, default: uuidv4() },
  user: { type: Object, ref: 'User', required: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [String], default: [] },
  location: { type: String },
  sportType: { type: String },
  when: { type: Date },
});

export default model<IPost>('Post', PostSchema);

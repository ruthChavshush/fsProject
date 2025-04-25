import mongoose, { Document, Schema } from 'mongoose';
import { Comment } from '@shared/types/post.type';

type IComment = Document & Comment;

export const CommentSchema: Schema = new Schema<IComment>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
});


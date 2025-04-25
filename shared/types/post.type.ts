import { User } from "./user.type"

export type Comment = {
  content: string
  createdAt: Date
  userId: string
  userName: string
}

export type addComment = Omit<Comment, "createdAt">

export type Post = {
  image: string
  caption: string
  createdAt: Date
  _id: string
  user: User
  comments: Comment[]
  likes: string[]
  location: string
  sportType: string
  when: Date
}

export type upsertPost = Omit<
  Post,
  "_id" | "createdAt" | "comments" | "likes" | "image" | "user"
> & { image: File; user: string; _id?: string }

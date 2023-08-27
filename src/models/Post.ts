import { Document, Model, Schema, Types, model } from "mongoose";
import { IComment } from "./Comment";
import { IRecipe } from "./Recipe";
import { IUser } from "./User";

export interface IPost extends Document {
  posterId: IUser['_id']
  title: string
  content: string
  video?: string
  like?: IUser['_id'][]
  dislike?: IUser['_id'][]
  comments?: IComment['_id'][]
  createdAt: Date
  recipe: IRecipe['_id']
}
export const postSchema: Schema = new Schema<IPost>({
  posterId: { type: Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  video: { type: String, default: "" },
  like: { type: Types.ObjectId, default: 0, ref: 'User', required: false },
  dislike: { type: Types.ObjectId, default: 0, ref: 'User', required: false },
  comments: { type: Types.ObjectId, default: 0, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now },
  recipe: { type: Types.ObjectId, ref: 'Recipe' },
})

const Post: Model<IPost> = model<IPost>('Post', postSchema)
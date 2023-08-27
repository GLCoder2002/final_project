import { Document, Model, Schema, model } from "mongoose"

export interface ICategory extends Document {
  name: string
  description: string
}
export const categorySchema: Schema = new Schema<ICategory>({
  name: String,
  description: { type: String, default: "" }
})

const Category: Model<ICategory> = model<ICategory>('Category', categorySchema)
export default Category;
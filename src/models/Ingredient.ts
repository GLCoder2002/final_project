import { Document, Model, Schema, model } from "mongoose"

export interface IIngredient extends Document {
  name: string
  description?: string
  image?: string
  quantity?: string
}

export const ingredientSchema: Schema = new Schema<IIngredient>({
  name: String,
  description: String,
  image: { type: String, required: true },
  quantity: { type: String, default: '' }
})

const Ingredient: Model<IIngredient> = model<IIngredient>('Ingredient', ingredientSchema)

export default Ingredient;
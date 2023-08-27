import { Document, Model, Schema, Types, model } from "mongoose";
import { ICategory } from "./Category";
import { IIngredient } from "./Ingredient";

export interface IRecipe extends Document {
  name: string;
  description?: string
  ingredients?: IIngredient['_id'][]
  category?: ICategory['_id']
}

export const recipeSchema: Schema = new Schema<IRecipe>({
  name: String,
  description: String,
  ingredients: { type: Types.ObjectId, ref: 'Ingredient' },
  category: { type: Types.ObjectId, ref: 'Category' }
})

const Recipe: Model<IRecipe> = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
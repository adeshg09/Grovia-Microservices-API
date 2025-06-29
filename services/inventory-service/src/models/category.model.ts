import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategoryId?: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);

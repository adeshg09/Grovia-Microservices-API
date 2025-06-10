import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);

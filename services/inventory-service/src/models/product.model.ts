import { Schema, model, Document } from "mongoose";
import { PRODUCT_UNITS } from "../constants";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  categoryId: Schema.Types.ObjectId;
  subCategoryId: Schema.Types.ObjectId;
  images?: string[];
  thumbnail?: string;
  brand?: string;
  quantity: number;
  unit: PRODUCT_UNITS;
  isActive: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [{ type: String }],
    thumbnail: { type: String },
    brand: { type: String },
    quantity: { type: Number, default: 0 },
    unit: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);

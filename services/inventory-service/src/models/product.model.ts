import { Schema, model, Document } from "mongoose";
import { PRODUCT_UNITS } from "../constants";

export interface IProduct extends Document {
  name: string;
  description: string;
  categoryId: Schema.Types.ObjectId;
  image: string;
  brand?: string;
  quantity: number;
  unit: PRODUCT_UNITS;
  isActive: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true },
    brand: { type: String },
    quantity: { type: Number, default: 0 },
    unit: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);

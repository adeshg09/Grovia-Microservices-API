import { Schema, model } from "mongoose";
import { PRODUCT_STATUS } from "../constants";

export interface IInventory extends Document {
  outletId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  stock: number;
  price: number;
  discount?: number;
  status: PRODUCT_STATUS;
  isAvailable: boolean;
}

const InventorySchema = new Schema<IInventory>(
  {
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    stock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    status: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.AVAILABLE,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

InventorySchema.index({ outletId: 1, productId: 1 }, { unique: true });

export const Inventory = model<IInventory>("Inventory", InventorySchema);

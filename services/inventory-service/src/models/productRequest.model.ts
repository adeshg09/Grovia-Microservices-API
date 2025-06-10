import { Schema, model, Document } from "mongoose";
import { PRODUCT_REQUEST_STATUS } from "../constants";

export interface IProductRequest extends Document {
  outletId: Schema.Types.ObjectId;
  requestedBy: Schema.Types.ObjectId; // Outlet-admin
  products: {
    productId: Schema.Types.ObjectId;
    quantity: number;
    remarks?: string;
  }[];
  status: PRODUCT_REQUEST_STATUS;
  reviewedBy?: Schema.Types.ObjectId;
  reviewedAt?: Date;
  notes?: string;
}

const ProductRequestSchema = new Schema<IProductRequest>(
  {
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        remarks: { type: String },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_REQUEST_STATUS),
      default: PRODUCT_REQUEST_STATUS.PENDING,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    reviewedAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ProductRequest = model<IProductRequest>(
  "ProductRequest",
  ProductRequestSchema
);

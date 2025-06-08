import { Schema, model, Document } from "mongoose";
import { AddressType } from "../constants";

export interface IAddress extends Document {
  customerId: Schema.Types.ObjectId;
  tag?: string;
  completeAddress: string;
  street?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  landmark?: string;
  isDefault?: boolean;
}

const AddressSchema = new Schema<IAddress>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    tag: {
      type: String,
      required: true,
      enum: Object.values(AddressType),
      default: "Home",
    },
    completeAddress: { type: String, required: true },
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    landmark: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AddressSchema.index({ coordinates: "2dsphere" });

export const Address = model<IAddress>("Address", AddressSchema);

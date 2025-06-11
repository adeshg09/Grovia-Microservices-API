import { Schema, model, Document } from "mongoose";
import { OUTLET_STATUS, OUTLET_TYPE } from "../constants";

export interface IOutlet extends Document {
  adminId?: Schema.Types.ObjectId;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  contactNumber: string;
  captains: Schema.Types.ObjectId[];
  status: OUTLET_STATUS;
  type: OUTLET_TYPE;
  isActive: boolean;
  isDefault: boolean;
}

const OutletSchema = new Schema<IOutlet>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
    pincode: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    contactNumber: { type: String, required: true },
    captains: [
      {
        type: Schema.Types.ObjectId,
        ref: "Captain",
      },
    ],
    type: {
      type: String,
      required: true,
      enum: Object.values(OUTLET_TYPE),
      default: OUTLET_TYPE.SECONDARY,
    },
    status: {
      type: String,
      enum: Object.values(OUTLET_STATUS),
      default: OUTLET_STATUS.OPEN,
    },
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OutletSchema.index({ coordinates: "2dsphere" });

export const Outlet = model<IOutlet>("Outlet", OutletSchema);

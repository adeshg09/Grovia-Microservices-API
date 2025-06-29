import { Schema, model, Document } from "mongoose";
import { GENDERS, VehicleType } from "../constants";

export interface ICaptain extends Document {
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  dob?: Date;
  gender?: GENDERS;
  profileImage?: string;
  vehicleType?: VehicleType;
  workCity?: string;
  outletId?: Schema.Types.ObjectId;
  outletAssignedAt?: Date;
  isKYCComplete: boolean;
  isApprovedByOutletAdmin: boolean;
}

const CaptainSchema = new Schema<ICaptain>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
    },
    profileImage: { type: String },
    vehicleType: { type: String },
    workCity: { type: String },
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      default: null,
    },
    outletAssignedAt: { type: Date },
    isKYCComplete: { type: Boolean, default: false },
    isApprovedByOutletAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Captain = model<ICaptain>("Captain", CaptainSchema);

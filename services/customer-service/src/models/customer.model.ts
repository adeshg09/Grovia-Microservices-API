import { Schema, model, Document } from "mongoose";
import { GENDERS } from "../constants";

export interface ICustomer extends Document {
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  dob?: Date;
  gender?: GENDERS;
  addresses: Schema.Types.ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>(
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
    profileImage: { type: String },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  { timestamps: true }
);

export const Customer = model<ICustomer>("Customer", CustomerSchema);

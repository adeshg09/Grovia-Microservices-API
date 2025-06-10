import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

const AdminSchema = new Schema<IAdmin>(
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
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>("Admin ", AdminSchema);

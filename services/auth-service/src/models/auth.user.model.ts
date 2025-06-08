import { Schema, model, Document } from "mongoose";
import { USER_ROLES, USER_STATUS } from "../constants";

export interface IUser extends Document {
  phoneNumber: string;
  role: USER_ROLES;
  status: USER_STATUS;
  isActivated: boolean;
  isPhoneVerified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(USER_ROLES) },
    status: { type: String, required: true, enum: Object.values(USER_STATUS) },
    isActivated: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);

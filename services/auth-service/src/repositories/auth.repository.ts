import { User } from "../models/auth.user.model";

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const findUsersByPhone = async (phoneNumber: string) => {
  return await User.find({ phoneNumber });
};

export const findUserByPhoneAndRole = async (
  phoneNumber: string,
  role: string
) => {
  return await User.findOne({ phoneNumber, role });
};

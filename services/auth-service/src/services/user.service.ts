import { createUserDto } from "../dtos/user.dtos";
import { User } from "../models/auth.user.model";

export const getUserByIdService = async (userId: string) => {
  const user = await User.findById(userId);

  const userData = {
    userId: user?._id,
    phoneNumber: user?.phoneNumber,
    role: user?.role,
    status: user?.status,
    isActivated: user?.isActivated,
    isPhoneVerified: user?.isPhoneVerified,
  };

  return userData ? userData : null;
};

export const createUserService = async (createUserData: createUserDto) => {
  const { phoneNumber, role, status, isActivated, isPhoneVerified } =
    createUserData;

  const user = await User.create({
    phoneNumber,
    role,
    status,
    isActivated,
    isPhoneVerified,
  });

  return user;
};

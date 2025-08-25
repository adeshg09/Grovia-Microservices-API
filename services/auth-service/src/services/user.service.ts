import { RESPONSE_ERROR_MESSAGES, USER_ROLES } from "../constants";
import { createUserDto } from "../dtos/user.dtos";
import { User } from "../models/auth.user.model";

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

export const getUserByIdService = async (userId: string) => {
  console.log("userId", userId);
  const user = await User.findById({
    _id: userId,
  });

  const userData = {
    userId: user?._id,
    phoneNumber: user?.phoneNumber,
    role: user?.role,
    status: user?.status,
    isActivated: user?.isActivated,
    isPhoneVerified: user?.isPhoneVerified,
    availableAccounts: user?.availableAccounts,
  };

  return userData ? userData : null;
};

export const getUsersByIdsService = async (userIds: string[]) => {
  const users = await User.find({ _id: { $in: userIds } });

  return users.map((user) => ({
    id: user._id,
    phoneNumber: user.phoneNumber,
    role: user.role,
    status: user.status,
    isActivated: user.isActivated,
    isPhoneVerified: user.isPhoneVerified,
  }));
};

export const updateUserStatusService = async (
  userId: string,
  status: string
) => {
  const user = await User.findByIdAndUpdate(userId, { status }, { new: true });

  if (!user) throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_FOUND);

  if (user.role !== USER_ROLES.CAPTAIN) {
    throw new Error("Only Captains Status can be updated");
  }

  return {
    id: user._id,
    phoneNumber: user.phoneNumber,
    role: user.role,
    status: user.status,
    isActivated: user.isActivated,
    isPhoneVerified: user.isPhoneVerified,
  };
};

export const updateUserActivationService = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActivated: true },
    { new: true }
  );

  if (!user) throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_FOUND);

  return {
    updatedUser: {
      userId: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
      isActivated: user.isActivated,
      isPhoneVerified: user.isPhoneVerified,
    },
  };
};

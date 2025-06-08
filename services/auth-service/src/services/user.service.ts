import { User } from "../models/auth.user.model";

export const getUserDetailsByIdService = async (userId: string) => {
  const user = await User.findById(userId);
  console.log("userData", user);

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

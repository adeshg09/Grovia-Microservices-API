export const createAdminProfile = (user: any, additionalData: any = {}) => {
  console.log("user", user);
  return {
    id: user._id,
    phoneNumber: user.phoneNumber,
    role: user.role,
    status: user.status,
    isActivated: user.isActivated,
    isPhoneVerified: user.isPhoneVerified,
    ...additionalData,
  };
};

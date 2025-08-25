import axios from "axios";
import { envConfig } from "../config/env.config";
import {
  RESPONSE_ERROR_MESSAGES,
  CLIENT_TYPES,
  USER_STATUS,
  USER_ROLES,
} from "../constants";
import { verifyOtpDto } from "../dtos/auth.dtos";
import { User } from "../models/auth.user.model";
import { verifyOtpViaTwilio } from "../utils/sms.otp";
import { generateTempToken, generateTokens } from "../utils/tokens";

export const verifyOtpWithTwilio = async (
  phoneNumber: string,
  otp: string,
  countryCode: string
): Promise<void> => {
  const verification = await verifyOtpViaTwilio(phoneNumber, otp, countryCode);

  if (verification.status !== "approved") {
    throw new Error(RESPONSE_ERROR_MESSAGES.TOKEN_INVALID);
  }
};

export const validateOtpInput = (data: verifyOtpDto): void => {
  const { phoneNumber, countryCode, clientType, role, isTruecaller, otp } =
    data;

  if (!phoneNumber || !countryCode || !clientType) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (!Object.values(CLIENT_TYPES).includes(clientType)) {
    throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_CLIENT_TYPE);
  }

  if (clientType === CLIENT_TYPES.MOBILE && !role) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (!isTruecaller && !otp) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }
};

export const findOrCreateMobileUser = async (
  phoneNumber: string,
  role: string
) => {
  let user = await User.findOne({ phoneNumber, role });

  if (!user) {
    user = await User.create({
      phoneNumber,
      role,
      status: USER_STATUS.ACTIVE,
      isPhoneVerified: true,
      isActivated: false,
    });
  }

  if (!user.isPhoneVerified) {
    user.isPhoneVerified = true;
    await user.save();
  }

  return user;
};

export const createUserProfile = (user: any, additionalData: any = {}) => {
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

export const handleMobileAuth = async (
  phoneNumber: string,
  role: string
): Promise<any> => {
  const user = await findOrCreateMobileUser(phoneNumber, role);
  const tokens = await generateTokens(user);

  return {
    user: createUserProfile(user),
    tokens,
  };
};

export const findWebUsers = async (phoneNumber: string) => {
  const users = await User.find({ phoneNumber });

  if (!users || users.length === 0) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_REGISTERED);
  }

  return users;
};

export const getAdminProfile = async (userId: string) => {
  const response = await axios.get(
    `${envConfig.ADMIN_SERVICE_URL}/get-outlet-admin-profile-by-userId/${userId}`
  );
  console.log("getAdminProfile", response);
  return response.data.data;
};

export const getOutletsByAdminId = async (adminId: string) => {
  const response = await axios.get(
    `${envConfig.INVENTORY_SERVICE_URL}/outlets/get-all-outlet-details?adminId=${adminId}`
  );
  return response.data.data.outlets || [];
};

export const getUserWithOutletData = async (user: any) => {
  const adminProfile = await getAdminProfile(user._id);
  const outlets = await getOutletsByAdminId(adminProfile.id);

  return { user, adminProfile, outlets };
};

export const handleOutletAdmin = async (user: any): Promise<any> => {
  const { adminProfile, outlets } = await getUserWithOutletData(user);

  if (!outlets || outlets.length === 0) {
    throw new Error(RESPONSE_ERROR_MESSAGES.OUTLET_NOT_ASSIGNED);
  }

  if (outlets.length === 1) {
    const tokens = await generateTokens(user);
    return {
      user: createUserProfile(user, {
        profile: adminProfile,
        outlet: outlets[0],
      }),
      tokens,
    };
  }

  const options = outlets.map((outlet: any) =>
    createUserProfile(user, { profile: adminProfile, outlet })
  );

  await User.findOneAndUpdate(
    { phoneNumber: user.phoneNumber },
    {
      availableAccounts: options,
    },
    { upsert: true }
  );

  return {
    requireLoginOptionsSelection: true,
    options: options,
  };
};

export const handleSuperAdmin = async (user: any): Promise<any> => {
  const tokens = await generateTokens(user);
  return {
    user: createUserProfile(user),
    tokens,
  };
};

export const handleSingleUser = async (user: any): Promise<any> => {
  if (user.role === USER_ROLES.OUTLET_ADMIN) {
    return await handleOutletAdmin(user);
  }

  if (user.role === USER_ROLES.SUPER_ADMIN) {
    return await handleSuperAdmin(user);
  }

  throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_ROLE);
};

export const handleMultipleUsers = async (users: any[]): Promise<any> => {
  const userOptions = [];
  for (const user of users) {
    if (user.role === USER_ROLES.OUTLET_ADMIN) {
      const { adminProfile, outlets } = await getUserWithOutletData(user);

      if (outlets) {
        // Create separate option for each outlet
        outlets.forEach((outlet: any) => {
          userOptions.push(
            createUserProfile(user, { profile: adminProfile, outlet: outlet })
          );
        });
      } else {
        // If no outlets, throw error
        throw new Error(RESPONSE_ERROR_MESSAGES.OUTLET_NOT_ASSIGNED);
      }
    } else if (user.role === USER_ROLES.SUPER_ADMIN) {
      // For super admin, we need to get profile but no outlets
      const adminProfile = await getAdminProfile(user._id);
      userOptions.push(
        createUserProfile(user, { profile: adminProfile, outlet: {} })
      );
    } else {
      // For other roles, add with empty outlet
      userOptions.push(createUserProfile(user, { outlet: {} }));
    }
  }

  await User.updateMany(
    { phoneNumber: users[0].phoneNumber },
    { $set: { availableAccounts: userOptions } },
    { upsert: true }
  );

  const { tempToken } = await generateTempToken({
    isOtpVerified: true,
  });

  return {
    requireLoginOptionsSelection: true,
    options: userOptions,
    tempToken,
  };
};

export const handleWebAuth = async (phoneNumber: string): Promise<any> => {
  const users = await findWebUsers(phoneNumber);

  if (users.length === 1) {
    // it can be just superadmin or just outletadmin(assigned to 1 outlet or more outlets)
    return await handleSingleUser(users[0]);
  }

  return await handleMultipleUsers(users); // it wil be superadmin+outletadmin(assigned to 1 or more outlets)
};

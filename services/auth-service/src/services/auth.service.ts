import axios from "axios";
import {
  CLIENT_TYPES,
  OTP_CHANNEL,
  RESPONSE_ERROR_MESSAGES,
  USER_ROLES,
} from "../constants";
import {
  OtpDTO,
  selectLoginOptionDto,
  SwitchAccountDto,
  verifyOtpDto,
} from "../dtos/auth.dtos";
import { User } from "../models/auth.user.model";
import { formatPhoneNumber } from "../utils";
import {
  sendOTP,
  sendOTPViaTwilio,
  verifyOtp,
  verifyOtpViaTwilio,
} from "../utils/sms.otp";
import {
  createUserProfile,
  getAdminProfile,
  handleMobileAuth,
  handleWebAuth,
  validateOtpInput,
  verifyOtpWithTwilio,
} from "../lib/auth.lib";
import { findUserById } from "../repositories/auth.repository";
import { envConfig } from "../config/env.config";
import { generateTokens } from "../utils/tokens";

// Initiate Send Otp
export const initiateSendOtp = async (otpData: OtpDTO) => {
  const {
    phoneNumber,
    countryCode,
    channel = OTP_CHANNEL.SMS,
    clientType,
  } = otpData;

  if (!phoneNumber || !countryCode || !clientType) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (!Object.values(CLIENT_TYPES).includes(clientType)) {
    throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_CLIENT_TYPE);
  }

  const formattedPhone = formatPhoneNumber(phoneNumber, countryCode);

  if (clientType === "web") {
    // Web dashboard only allows existing users (superadmin, outletadmin)
    const user = await User.findOne({ phoneNumber: formattedPhone });

    if (!user) {
      throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_REGISTERED);
    }
  }

  // try {
  return await sendOTP(phoneNumber, countryCode, channel);
  // } catch (err) {
  //   console.error("Twilio failed, falling back to Firebase", err);
  //   return await sendOTPViaFirebase(phoneNumber, countryCode);
  // }
};

// Initiate Verify Otp
export const initiateVerifyOtp = async (verifyOtpData: verifyOtpDto) => {
  validateOtpInput(verifyOtpData);

  if (!verifyOtpData.isTruecaller) {
    // try {
    const verification = await verifyOtp(
      verifyOtpData.phoneNumber,
      verifyOtpData.otp!,
      verifyOtpData.countryCode
    );

    if (verification.status !== "approved") {
      throw new Error(RESPONSE_ERROR_MESSAGES.TOKEN_INVALID);
    }
    // } catch (error) {
    //   await verifyOtpViaFirebase(
    //     verifyOtpData.phoneNumber,
    //     verifyOtpData.otp!,
    //     verifyOtpData.countryCode
    //   );
    // }
  }

  const formattedPhone = formatPhoneNumber(
    verifyOtpData.phoneNumber,
    verifyOtpData.countryCode
  );

  //  Mobile flow: Create user if not exists or login
  if (verifyOtpData.clientType === CLIENT_TYPES.MOBILE) {
    return await handleMobileAuth(formattedPhone, verifyOtpData.role!);
  }

  if (verifyOtpData.clientType === CLIENT_TYPES.WEB) {
    return await handleWebAuth(formattedPhone);
  }

  throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_CLIENT_TYPE);
};

export const initiateSelectLoginOption = async (
  selectLoginOptionData: selectLoginOptionDto
) => {
  const { userId, selectedRole, selectedOutletId, clientType } =
    selectLoginOptionData;

  if (!userId || !selectedRole || !clientType) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (!Object.values(CLIENT_TYPES).includes(clientType)) {
    throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_CLIENT_TYPE);
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const profile = await getAdminProfile(user._id as string);

  let outletData;
  let tokens;

  if (selectedRole === USER_ROLES.SUPER_ADMIN) {
    tokens = await generateTokens(user);
  } else if (selectedRole === USER_ROLES.OUTLET_ADMIN) {
    if (!selectedOutletId) {
      throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
    }

    const outletResponse = await axios.get(
      `${envConfig.INVENTORY_SERVICE_URL}/outlets/get-outlet-details-by-id/${selectedOutletId}`
    );
    outletData = outletResponse.data?.data;

    tokens = await generateTokens(user, selectedOutletId);
  } else {
    throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_ROLE);
  }

  return {
    selectedAccount: createUserProfile(user, {
      profile,
      ...(outletData && { outlet: outletData }),
    }),
    tokens,
  };
};

// export const initiateSwitchAccount = async (
//   switchAccountData: SwitchAccountDto
// ) => {
//   const { currentUserId, selectedRole, selectedOutletId, clientType } =
//     switchAccountData;

//   if (!currentUserId || !selectedRole || !clientType) {
//     throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
//   }

//   return await processAccountSelection({
//     userId: currentUserId,
//     selectedRole,
//     selectedOutletId,
//     clientType,
//   });
// };

// const processAccountSelection = async ({
//   userId,
//   selectedRole,
//   selectedOutletId,
//   clientType,
// }: {
//   userId: string;
//   selectedRole: string;
//   selectedOutletId?: string;
//   clientType: string;
// }) => {
//   if (!Object.values(CLIENT_TYPES).includes(clientType)) {
//     throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_CLIENT_TYPE);
//   }

//   const user = await findUserById(userId);
//   if (!user) {
//     throw new Error(RESPONSE_ERROR_MESSAGES.USER_NOT_FOUND);
//   }

//   const profile = await getAdminProfile(user._id as string);
//   let outletData;
//   let tokens;

//   if (selectedRole === USER_ROLES.SUPER_ADMIN) {
//     tokens = await generateTokens(user, selectedRole);
//   } else if (selectedRole === USER_ROLES.OUTLET_ADMIN) {
//     if (!selectedOutletId) {
//       throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
//     }

//     // Validate user has access to the selected outlet
//     const userOutlets = profile.outlets || [];
//     const hasOutletAccess = userOutlets.some(
//       (outlet: any) => outlet._id.toString() === selectedOutletId
//     );

//     if (!hasOutletAccess) {
//       throw new Error(RESPONSE_ERROR_MESSAGES.OUTLET_NOT_ASSIGNED);
//     }

//     const outletResponse = await axios.get(
//       `${envConfig.INVENTORY_SERVICE_URL}/outlets/get-outlet-details-by-id/${selectedOutletId}`
//     );
//     outletData = outletResponse.data?.data;

//     tokens = await generateTokens(user, selectedRole, selectedOutletId);
//   } else {
//     throw new Error(RESPONSE_ERROR_MESSAGES.INVALID_ROLE);
//   }

//   return {
//     selectedAccount: createUserProfile(user, {
//       profile,
//       ...(outletData && { outlet: outletData }),
//     }),
//     tokens,
//   };
// };

import { RESPONSE_ERROR_MESSAGES, USER_ROLES, USER_STATUS } from "../constants";
import { OtpDTO, verifyOtpDto } from "../dtos/auth.dtos";
import { User } from "../models/auth.user.model";
import { formatPhoneNumber } from "../utils";
import { sendOTPViaTwilio, verifyOtpViaTwilio } from "../utils/sms";
import { generateTokens } from "../utils/tokens";

// Initiate Send Otp
export const initiateSendOtp = async (otpData: OtpDTO) => {
  const { phoneNumber, countryCode, channel } = otpData;

  if (!phoneNumber || !countryCode) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const response = await sendOTPViaTwilio(phoneNumber, countryCode, channel);
  return response;
};

// Initiate Verify Otp
export const initiateVerifyOtp = async (verifyOtpData: verifyOtpDto) => {
  const { phoneNumber, countryCode, otp, role } = verifyOtpData;

  if (!phoneNumber || !countryCode || !otp || !role) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const verification = await verifyOtpViaTwilio(phoneNumber, otp, countryCode);
  if (verification.status !== "approved") {
    throw new Error(RESPONSE_ERROR_MESSAGES.TOKEN_INVALID);
  }

  const formattedPhone = formatPhoneNumber(phoneNumber, countryCode);
  let user = await User.findOne({ phoneNumber: formattedPhone, role: role });

  if (!user) {
    user = await User.create({
      phoneNumber: formattedPhone,
      role,
      status: USER_STATUS.ACTIVE,
      isPhoneVerified: true,
      isActivated: false,
    });
  } else {
    if (!user.isPhoneVerified) {
      user.isPhoneVerified = true;
      await user.save();
    }
  }

  const tokens = await generateTokens(user);
  return {
    user: {
      id: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
      isActivated: user.isActivated,
      isPhoneVerified: user.isPhoneVerified,
    },
    tokens: tokens,
  };
};

import { OTP_CHANNEL } from "../constants";
import { formatPhoneNumber } from ".";
import { otpProviders } from "../config/otpProviders.config";
import { envConfig } from "../config/env.config";

const PROVIDER = envConfig.OTP_PROVIDER;

export const sendOTPViaTwilio = async (
  phoneNumber: string,
  countryCode?: string,
  channel: OTP_CHANNEL = OTP_CHANNEL.SMS
) => {
  return otpProviders.twilio.client.verify.v2
    .services(otpProviders.twilio.verifyServiceSid)
    .verifications.create({
      to: formatPhoneNumber(phoneNumber, countryCode),
      channel,
    });
};

export const verifyOtpViaTwilio = async (
  phoneNumber: string,
  code: string,
  countryCode?: string
) => {
  return otpProviders.twilio.client.verify.v2
    .services(otpProviders.twilio.verifyServiceSid)
    .verificationChecks.create({
      to: formatPhoneNumber(phoneNumber, countryCode),
      code,
    });
};

export const sendOTPViaMock = async (
  phoneNumber: string,
  countryCode?: string,
  channel: string = "sms"
) => {
  console.log(
    `📱 [MOCK OTP] Sending OTP to ${countryCode}${phoneNumber} via ${channel}`
  );

  return { status: "pending", to: `${countryCode}${phoneNumber}`, channel };
};

export const verifyOtpViaMock = async (
  phoneNumber: string,
  code: string,
  countryCode?: string
) => {
  console.log(
    `📱 [MOCK OTP] Verifying OTP ${code} for ${countryCode}${phoneNumber}`
  );

  if (code === envConfig.OTP_MOCK) {
    return { status: "approved" };
  }
  return { status: "rejected" };
};

export const sendOTP = async (
  phoneNumber: string,
  countryCode?: string,
  channel: OTP_CHANNEL = OTP_CHANNEL.SMS
) => {
  switch (PROVIDER) {
    case "mock":
      return sendOTPViaMock(phoneNumber, countryCode, channel);
    case otpProviders.twilio.name:
      return sendOTPViaTwilio(phoneNumber, countryCode, channel);
    // case "whatsapp":
    //   return sendOTPViaWhatsApp(phoneNumber, countryCode, channel);
    default:
      throw new Error(`Unsupported OTP provider: ${PROVIDER}`);
  }
};

export const verifyOtp = async (
  phoneNumber: string,
  code: string,
  countryCode?: string
) => {
  switch (PROVIDER) {
    case "mock":
      return verifyOtpViaMock(phoneNumber, code, countryCode);
    case otpProviders.twilio.name:
      return verifyOtpViaTwilio(phoneNumber, code, countryCode);
    // case "whatsapp":
    //   return verifyOtpViaWhatsApp(phoneNumber, code, countryCode);
    default:
      throw new Error(`Unsupported OTP provider: ${PROVIDER}`);
  }
};

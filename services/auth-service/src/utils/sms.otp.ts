import twilio from "twilio";
import { envConfig } from "../config/env.config";
import { SEND_OTP_CHANNEL } from "../constants";
import { formatPhoneNumber } from ".";

const twilioClient = twilio(
  envConfig.TWILIO_ACCOUNT_SID,
  envConfig.TWILIO_AUTH_TOKEN
);

const verifyServiceSid: string = (() => {
  if (!envConfig.TWILIO_VERIFY_SERVICE_SID) {
    throw new Error(
      "TWILIO_VERIFY_SERVICE_SID is not defined in environment variables"
    );
  }
  return envConfig.TWILIO_VERIFY_SERVICE_SID;
})();

export const sendOTPViaTwilio = async (
  phoneNumber: string,
  countryCode?: string,
  channel: SEND_OTP_CHANNEL = SEND_OTP_CHANNEL.SMS
) => {
  return twilioClient.verify.v2
    .services(verifyServiceSid)
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
  return twilioClient.verify.v2
    .services(verifyServiceSid)
    .verificationChecks.create({
      to: formatPhoneNumber(phoneNumber, countryCode),
      code,
    });
};

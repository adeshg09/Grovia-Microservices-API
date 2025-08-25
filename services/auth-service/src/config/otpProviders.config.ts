import twilio from "twilio";
import { envConfig } from "./env.config";

const twilioProvider = {
  name: "twilio",
  client: twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN),
  verifyServiceSid: (() => {
    if (!envConfig.TWILIO_VERIFY_SERVICE_SID) {
      throw new Error(
        "TWILIO_VERIFY_SERVICE_SID is not defined in environment variables"
      );
    }
    return envConfig.TWILIO_VERIFY_SERVICE_SID;
  })(),
};

export const otpProviders = {
  twilio: twilioProvider,
};

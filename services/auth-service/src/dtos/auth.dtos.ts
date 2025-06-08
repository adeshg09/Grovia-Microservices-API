import { JwtPayload } from "jsonwebtoken";
import { SEND_OTP_CHANNEL, USER_ROLES } from "../constants";

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: USER_ROLES;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface OtpDTO {
  phoneNumber: string;
  countryCode: string;
  channel: SEND_OTP_CHANNEL;
}

export interface verifyOtpDto {
  phoneNumber: string;
  countryCode: string;
  otp: string;
  role?: USER_ROLES;
}

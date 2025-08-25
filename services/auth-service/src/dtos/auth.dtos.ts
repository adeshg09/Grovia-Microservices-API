import { JwtPayload } from "jsonwebtoken";
import { CLIENT_TYPES, OTP_CHANNEL, USER_ROLES } from "../constants";

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
  channel: OTP_CHANNEL;
  clientType: CLIENT_TYPES;
}

export interface verifyOtpDto {
  phoneNumber: string;
  countryCode: string;
  otp?: string;
  role: USER_ROLES;
  isTruecaller?: boolean;
  clientType: CLIENT_TYPES;
}

export interface selectLoginOptionDto {
  userId: string;
  selectedRole: USER_ROLES;
  selectedOutletId?: string;
  clientType: CLIENT_TYPES;
}

export interface SwitchAccountDto {
  selectedRole: string;
  selectedOutletId?: string;
  clientType: string;
  currentUserId: string;
}

import { JwtPayload } from "jsonwebtoken";
import { USER_ROLES } from "../constants";

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: USER_ROLES;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface createCaptainProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  dob?: Date;
  gender?: string;
}

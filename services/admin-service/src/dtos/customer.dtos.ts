import { JwtPayload } from "jsonwebtoken";
import { USER_ROLES, USER_STATUS } from "../constants";

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: USER_ROLES;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface createOutletAdminProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: USER_ROLES.OUTLET_ADMIN;
  status: USER_STATUS;
  profileImage?: string;
}

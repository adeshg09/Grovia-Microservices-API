import { USER_ROLES, USER_STATUS } from "../constants";

export interface createUserDto {
  phoneNumber: string;
  role: USER_ROLES;
  status: USER_STATUS;
  isActivated?: boolean;
  isPhoneVerified?: boolean;
}

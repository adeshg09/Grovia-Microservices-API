import axios from "axios";
import { RESPONSE_ERROR_MESSAGES, USER_ROLES } from "../constants";
import { createOutletAdminProfileDto } from "../dtos/customer.dtos";
import { Admin } from "../models/admin.model";
import { envConfig } from "../config/env.config";
import { authClient, inventoryClient } from "../config/axios.config";

export const createOutletAdminProfileService = async (
  createOutletAdminProfileData: createOutletAdminProfileDto,
  token: string
) => {
  const {
    firstName,
    lastName,
    email,
    profileImage,
    phoneNumber,
    role,
    status,
  } = createOutletAdminProfileData;

  if (!firstName || !lastName || !email || !phoneNumber || !role || !status) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ADMIN_PROFILE_EXISTS);
  }

  const adminUserResponse = await authClient.post(
    "/users/create-user",
    {
      phoneNumber,
      role,
      status,
      isActivated: true,
      isPhoneVerified: true,
    },
    token
  );

  const { user: adminUserData } = adminUserResponse.data.data;

  const outletAdmin = await Admin.create({
    userId: adminUserData._id,
    firstName,
    lastName,
    email,
    profileImage,
  });

  return {
    id: outletAdmin?._id,
    userId: outletAdmin?.userId,
    firstName: outletAdmin?.firstName,
    lastName: outletAdmin?.lastName,
    email: outletAdmin?.email,
    profileImage: outletAdmin?.profileImage,
    phoneNumber: adminUserData.phoneNumber,
    role: adminUserData?.role,
    status: adminUserData?.status,
  };
};

export const getOutletAdminProfileByIdService = async (adminId: string) => {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ADMIN_PROFILE_NOT_FOUND);
  }

  const adminData = {
    id: admin?._id,
    userId: admin?.userId,
    firstName: admin?.firstName,
    lastName: admin?.lastName,
    email: admin?.email,
    profileImage: admin?.profileImage,
  };

  return adminData ? adminData : null;
};

export const getoutletAdminProfileByUserIdService = async (userId: string) => {
  const admin = await Admin.findOne({ userId: userId });
  if (!admin) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ADMIN_PROFILE_NOT_FOUND);
  }

  const adminData = {
    id: admin?._id,
    userId: admin?.userId,
    firstName: admin?.firstName,
    lastName: admin?.lastName,
    email: admin?.email,
    profileImage: admin?.profileImage,
  };

  return adminData ? adminData : null;
};

export const getAlloutletAdminsProfileService = async () => {
  const adminsProfile = await Admin.find();

  const admins = adminsProfile.map((admin) => ({
    id: admin._id,
    userId: admin.userId,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    profileImage: admin.profileImage,
  }));
  return { admins };
};

export const getAdminProfile = async (userId: string, token: string) => {
  const adminData = await Admin.findOne({ userId: userId });

  if (!adminData) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ADMIN_PROFILE_NOT_FOUND);
  }

  const response = await authClient.get(
    `/users/get-user-by-id/${userId}`,
    token
  );

  const { data: adminUserData } = response.data;
  console.log("adminUserData for checking availableAccounts", adminUserData);

  const outletResponse = await inventoryClient.get(
    `/outlets/get-outlet-details-by-adminId/${adminData._id}`,
    token
  );

  const { data: outletData } = outletResponse.data;

  const adminProfile = {
    firstName: adminData.firstName,
    lastName: adminData.lastName,
    email: adminData.email,
    phoneNumber: adminUserData.phoneNumber,
    role: adminUserData?.role,
    profileImage: adminData.profileImage,
    outlet: outletData,
    availableAccounts: adminUserData?.availableAccounts ?? [],
  };

  return adminProfile;
};

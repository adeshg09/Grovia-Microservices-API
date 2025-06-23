import * as mongoose from "mongoose";
import { RESPONSE_ERROR_MESSAGES, VehicleType } from "../constants";
import {
  addBankDetailsDto,
  createCaptainProfileDto,
} from "../dtos/captain.dtos";
import { Captain } from "../models/captain.model";
import { authClient } from "../config/axios.config";

export const createCaptainProfileService = async (
  createCaptainProfileData: createCaptainProfileDto,
  userId: string
) => {
  const { firstName, lastName, email, profileImage, dob, gender } =
    createCaptainProfileData;

  const captainUserId = userId;

  if (!firstName || !lastName || !email) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const captain = await Captain.findOne({ userId: captainUserId });
  if (captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_PROFILE_EXISTS);
  }

  const newCaptain = new Captain({
    userId: captainUserId,
    firstName,
    lastName,
    email: email.toLowerCase(),
    profileImage,
    dob,
    gender,
    isKYCComplete: false,
    isDocumentsVerified: false,
    isApprovedByOutletAdmin: false,
    isActive: false,
  });

  await newCaptain.save();

  return {
    captain: {
      userId: newCaptain.userId,
      firstName: newCaptain.firstName,
      lastName: newCaptain.lastName,
      email: newCaptain.email,
      profileImage: newCaptain.profileImage,
      dob: newCaptain.dob,
      gender: newCaptain.gender,
    },
  };
};

export const getCaptainProfile = async (userId: string, token: string) => {
  const captainData = await Captain.findOne({ userId: userId });

  const response = await authClient.get(`/users/user-details/${userId}`, token);

  const { data: captainUserData } = response.data;

  const captainProfile = {
    firstName: captainUserData?.firstName,
    lastName: captainUserData?.lastName,
    email: captainUserData?.email,
    phoneNumber: captainUserData.phoneNumber,
    role: captainUserData?.role,
    dob: captainUserData?.dob,
    gender: captainUserData?.gender,
    profileImage: captainUserData?.profileImage,
    outletId: captainData?.outletId,
    bankDetails: captainData?.bankDetails,
    isKYCComplete: captainData?.isKYCComplete,
    isDocumentsVerified: captainData?.isDocumentsVerified,
    isApprovedByOutletAdmin: captainData?.isApprovedByOutletAdmin,
    isActive: captainData?.isActive,
  };

  return captainProfile;
};

export const selectVehicleTypeService = async (
  vehicleType: VehicleType,
  userId: string
) => {
  const captain = await Captain.findOne({ userId });

  if (!captain) throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);

  captain.vehicleType = vehicleType;
  await captain.save();

  return {
    selectedVehicleType: captain.vehicleType,
  };
};

export const selectOutletService = async (outletId: string, userId: string) => {
  const captain = await Captain.findOne({ userId });

  if (!captain) throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);

  captain.outletId = new (mongoose as any).Types.ObjectId(outletId) as any;
  await captain.save();

  return {
    selectedOutletId: captain.outletId,
  };
};

export const addBankDetailsService = async (
  addBankDetailsData: addBankDetailsDto,
  userId: string
) => {
  const { bankDetails } = addBankDetailsData;

  const captain = await Captain.findOne({ userId: userId });

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.bankDetails = bankDetails;
  await captain.save();

  return {
    updatedCaptain: {
      userId: captain.userId,
      firstName: captain.firstName,
      lastName: captain.lastName,
      email: captain.email,
      profileImage: captain.profileImage,
      dob: captain.dob,
      gender: captain.gender,
      bankDetails: captain.bankDetails,
    },
  };
};

export const uploadLiveSelfieService = async (
  selfieUrl: string,
  userId: string
) => {
  if (!selfieUrl) throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);

  const captain = await Captain.findOne({ userId: userId });

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.selfieUrl = selfieUrl;
  await captain.save();

  return {
    updatedCaptain: {
      userId: captain.userId,
      firstName: captain.firstName,
      lastName: captain.lastName,
      email: captain.email,
      profileImage: captain.profileImage,
      dob: captain.dob,
      gender: captain.gender,
      selfieUrl: captain.selfieUrl,
    },
  };
};

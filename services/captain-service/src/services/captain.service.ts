import * as mongoose from "mongoose";
import { RESPONSE_ERROR_MESSAGES, VehicleType } from "../constants";
import { createCaptainProfileDto } from "../dtos/captain.dtos";
import { Captain } from "../models/captain.model";
import { authClient } from "../config/axios.config";
import { sendEmail } from "../utils/email";
import { getApprovalEmailTemplate } from "../utils/emailTemplate";
import { KycDetails } from "../models/kycdetails.model";

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
export const upsertCaptainProfileService = async (
  createCaptainProfileData: createCaptainProfileDto,
  userId: string
) => {
  const { firstName, lastName, email, profileImage, dob, gender } =
    createCaptainProfileData;

  const captainUserId = userId;

  let captain = await Captain.findOne({ userId: captainUserId });

  if (!captain && (!firstName || !lastName || !email)) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (captain) {
    // Update existing
    captain.firstName = firstName;
    captain.lastName = lastName;
    captain.email = email.toLowerCase();
    captain.profileImage = profileImage ?? captain.profileImage;
    captain.dob = dob ?? captain.dob;
    captain.gender = (gender as typeof captain.gender) ?? captain.gender;
  } else {
    // Create new
    captain = new Captain({
      userId: captainUserId,
      firstName,
      lastName,
      email: email.toLowerCase(),
      profileImage,
      dob,
      gender,
      isKYCComplete: false,
      isApprovedByOutletAdmin: false,
      isActive: false,
    });
  }

  await captain.save();

  return {
    captain: {
      userId: captain.userId,
      firstName: captain.firstName,
      lastName: captain.lastName,
      email: captain.email,
      profileImage: captain.profileImage,
      dob: captain.dob,
      gender: captain.gender,
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
    isKYCComplete: captainData?.isKYCComplete,
    isApprovedByOutletAdmin: captainData?.isApprovedByOutletAdmin,
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

export const upsertVehicleTypeService = async (
  vehicleType: VehicleType,
  userId: string
) => {
  const captain = await Captain.findOne({ userId });

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.vehicleType = vehicleType ?? captain.vehicleType;
  await captain.save();

  return {
    updatedVehicleType: captain.vehicleType,
  };
};

export const upsertWorkCityService = async (
  workCity: string,
  userId: string
) => {
  const captain = await Captain.findOne({ userId });

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.workCity = workCity ?? captain.workCity;
  await captain.save();

  return {
    updatedWorkCity: captain.workCity,
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

export const upsertOutletService = async (outletId: string, userId: string) => {
  const captain = await Captain.findOne({ userId });

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.outletId =
    (new (mongoose as any).Types.ObjectId(outletId) as any) ?? captain.outletId;
  await captain.save();

  return {
    updatedOutletId: captain.outletId,
  };
};

export const submitOnboardingService = async (userId: string) => {
  const captain = await Captain.findOne({ userId });
  const kycDetails = await KycDetails.findOne({ userId });

  if (!captain)
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_PROFILE_NOT_FOUND);

  if (!captain.firstName || !captain.lastName || !captain.email) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_ONBOARDING_STEP1_PENDING);
  }

  if (!captain.vehicleType || !captain.workCity || !captain.outletId) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_ONBOARDING_STEP2_PENDING);
  }

  if (!kycDetails?.bankDetails) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_ONBOARDING_STEP3_PENDING);
  }

  captain.isKYCComplete = true;
  captain.isApprovedByOutletAdmin = false;

  await captain.save();

  return {
    message:
      "Your profile is now under review. You'll be notified once it’s approved by the outlet admin.",
  };
};

export const approveCaptainService = async (
  captainId: string,
  outletAdminUserId: string,
  token: string
) => {
  const captain = await Captain.findById(captainId);
  const captainUserId = captain?.userId;

  if (!captain) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);
  }

  captain.isApprovedByOutletAdmin = true;

  await captain.save();

  const activationResponse = await authClient.patch(
    `/users/update-activation/${captainUserId}`,
    {},
    token
  );

  const { data: userData } = activationResponse.data;

  await sendEmail({
    to: captain.email,
    subject: "You're Approved as a Captain!",
    html: getApprovalEmailTemplate(captain.firstName),
  });

  return {
    captainId: captain._id,
    fullName: `${captain.firstName} ${captain.lastName}`,
    isApproved: captain.isApprovedByOutletAdmin,
    message: "Captain approved and notified via email.",
  };
};

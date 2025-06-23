import { RESPONSE_ERROR_MESSAGES, USER_ROLES } from "../constants";
import { VerifyManualPlanDto } from "../dtos/kycdetails.dtos";
import { KycDetails } from "../models/kycdetails.model";
import { Captain } from "../models/captain.model";
import axios from "axios";
import { envConfig } from "../config/env.config";

export const initiateAadhaarService = async (
  aadhaarNumber: string,
  userId: string
) => {
  if (!aadhaarNumber) throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);

  const captain = await Captain.findOne({ userId });

  // Check if captain already has verified Aadhaar
  const existingKyc = await KycDetails.findOne({
    captainId: captain?._id,
    aadhaarVerified: true,
  });

  if (existingKyc) {
    throw new Error(RESPONSE_ERROR_MESSAGES.AADHAAR_ALREADY_VERIFIED);
  }

  // Call Sandbox API to generate OTP
  const response = await axios.post(
    `${envConfig.SANDBOX_CONFIG.baseURL}/kyc/aadhaar/okyc/otp`,
    {
      "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
      aadhaar_number: aadhaarNumber,
      consent: "Y",
      reason: "For Captain Aadhaar KYC",
    },
    {
      headers: envConfig.SANDBOX_CONFIG.headers,
      timeout: 30000,
    }
  );

  return {
    referenceId: response.data.data.reference_id,
    message: response.data.data.message,
  };
};

export const verifyAadhaarService = async (
  referenceId: string,
  otp: string,
  userId: string
) => {
  if (!referenceId || !otp)
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);

  const captain = await Captain.findOne({ userId });

  // Call Sandbox API to verify OTP
  const response = await axios.post(
    `${envConfig.SANDBOX_CONFIG.baseURL}/kyc/aadhaar/okyc/otp/verify`,
    {
      "@entity": "in.co.sandbox.kyc.aadhaar.okyc.request",
      reference_id: referenceId,
      otp: otp,
    },
    {
      headers: envConfig.SANDBOX_CONFIG.headers,
      timeout: 30000,
    }
  );

  console.log("response", response.data);

  const { data: verificationData } = response.data;

  // Extract user details
  const userDetails = {
    name: verificationData.name,
    dob: verificationData.date_of_birth,
    gender: verificationData.gender,
    address: {
      full_address: verificationData.full_address,
      country: verificationData.address?.country,
      state: verificationData.address?.state,
      district: verificationData.address?.district,
      pincode: verificationData.address?.pincode,
      house: verificationData.address?.house,
      street: verificationData.address?.street,
      landmark: verificationData.address?.landmark,
      post_office: verificationData.address?.post_office,
      subdistrict: verificationData.address?.subdistrict,
      vtc: verificationData.address?.vtc,
    },
    photo: verificationData.photo,
    year_of_birth: verificationData.year_of_birth,
    share_code: verificationData.share_code,
  };

  // Update or create KYC record
  await KycDetails.findOneAndUpdate(
    { captainId: captain?._id },
    {
      $set: {
        aadhaarVerified: true,
        aadhaarUrl: `verified_${verificationData.reference_id}`, // Store masked Aadhaar Reference ID
        // Add extracted address to manual address if not exists
        ...(userDetails.address.full_address && {
          manualAddress: {
            addressLine1: userDetails.address.full_address,
            city: userDetails.address.vtc || userDetails.address.district,
            state: userDetails.address.state,
            country: userDetails.address.country || "India",
            pincode: userDetails.address.pincode,
          },
          addressVerified: true,
        }),
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return {
    verified: true,
    userDetails,
    message: "Aadhaar verification successful",
  };
};

export const verifyManualPanService = async (
  verifyManualPanData: VerifyManualPlanDto,
  userId: string
) => {
  const { panNumber, nameAsPerPan, dob } = verifyManualPanData;

  if (!panNumber || !nameAsPerPan || !dob) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const captain = await Captain.findOne({ userId });

  // Call Sandbox API to verify Pan
  const response = await axios.post(
    `${envConfig.SANDBOX_CONFIG.baseURL}/kyc/pan/verify`,
    {
      "@entity": "in.co.sandbox.kyc.pan.verify.request",
      pan: panNumber,
      name_as_per_pan: nameAsPerPan,
      date_of_birth: dob,
      consent: "Y",
      reason: "For Captain Pan KYC",
    },
    {
      headers: envConfig.SANDBOX_CONFIG.headers,
      timeout: 30000,
    }
  );

  const { data: verificationData } = response.data;

  // Update or create KYC record
  await KycDetails.findOneAndUpdate(
    { captainId: captain?._id },
    {
      $set: {
        panVerified: true,
        panUrl: "", // optional if no image
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return {
    verified: true,
    userDetails: verificationData,
    message: "Pan verification successful",
  };
};

export const submitKycDetailsService = async (userId: string) => {
  const captainDetails = await Captain.findOne({ userId });
  if (!captainDetails)
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_NOT_FOUND);

  const kycDetails = await KycDetails.findOne({
    captainId: captainDetails._id,
  });
  if (!kycDetails)
    throw new Error(RESPONSE_ERROR_MESSAGES.KYC_DETAILS_NOT_FOUND);

  const { panVerified, licenseVerified, addressVerified } = kycDetails;

  const aadhaarCheck = kycDetails.aadhaarVerified ?? true;

  if (!panVerified || !licenseVerified || !addressVerified || !aadhaarCheck) {
    throw new Error(RESPONSE_ERROR_MESSAGES.KYC_DETAILS_NOT_SUBMITTED);
  }

  kycDetails.submittedAt = new Date();
  await kycDetails.save();

  // Update captain status to mark it as under verification
  captainDetails.isKYCComplete = true;
  captainDetails.isDocumentsVerified = false; // waiting for manual verification
  captainDetails.isApprovedByOutletAdmin = false; // admin hasn't approved yet
  await captainDetails.save();

  return {
    captainId: captainDetails._id,
    kycSubmittedAt: kycDetails.submittedAt,
  };
};

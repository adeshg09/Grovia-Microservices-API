import axios from "axios";
import { RESPONSE_ERROR_MESSAGES, USER_ROLES } from "../constants";
import { createCustomerProfileDto } from "../dtos/customer.dtos";
import { Customer } from "../models/customer.model";
import { envConfig } from "../config/env.config";
import { authClient } from "../config/axios.config";

export const createCustomerProfileService = async (
  createCustomerProfileData: createCustomerProfileDto,
  userId: string
) => {
  const { firstName, lastName, email, profileImage, dob, gender } =
    createCustomerProfileData;

  const customerUserId = userId;

  if (!firstName || !lastName || !email) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const customer = await Customer.findOne({ userId: customerUserId });
  if (customer) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CUSTOMER_PROFILE_EXISTS);
  }

  const newCustomer = new Customer({
    userId: customerUserId,
    firstName,
    lastName,
    email: email.toLowerCase(),
    profileImage,
    dob,
    gender,
  });

  await newCustomer.save();

  return {
    customer: {
      userId: newCustomer.userId,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      email: newCustomer.email,
      profileImage: newCustomer.profileImage,
      dob: newCustomer.dob,
      gender: newCustomer.gender,
    },
  };
};

export const getCustomerProfile = async (userId: string, token: string) => {
  const customerData = await Customer.findOne({ userId: userId }).populate(
    "addresses"
  );

  const response = await authClient.get(`/users/user-details/${userId}`, token);

  const { data: customerUserData } = response.data;

  const customerProfile = {
    firstName: customerData?.firstName,
    lastName: customerData?.lastName,
    email: customerData?.email,
    phoneNumber: customerUserData.phoneNumber,
    role: customerUserData?.role,
    profileImage: customerData?.profileImage,
    dob: customerData?.dob,
    gender: customerData?.gender,
    addresses: customerData?.addresses,
  };

  return customerProfile;
};

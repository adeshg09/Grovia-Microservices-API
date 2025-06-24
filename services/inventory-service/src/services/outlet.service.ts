import axios from "axios";
import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { envConfig } from "../config/env.config";
import { createVendorOutletDto } from "../dtos/outlet.dtos";
import { Outlet } from "../models/outlet.model";
import { adminClient } from "../config/axios.config";

export const createVendorOutlet = async (
  createVendorOutletData: createVendorOutletDto,
  userId: string
) => {
  const {
    adminId,
    name,
    address,
    city,
    state,
    country,
    pincode,
    coordinates,
    contactNumber,
  } = createVendorOutletData;

  if (
    !adminId ||
    !name ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !coordinates ||
    !contactNumber
  ) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const outlet = new Outlet({
    adminId,
    name,
    address,
    city,
    state,
    country: country,
    pincode,
    location: {
      type: "Point",
      coordinates: [coordinates.latitude, coordinates.longitude],
    },
    contactNumber,
  });
  await outlet.save();
  return { outlet };
};

export const getOutletDetailsByIdService = async (outletId: string) => {
  const outlet = await Outlet.findById(outletId);

  const outletData = {
    adminId: outlet?.adminId,
    name: outlet?.name,
    address: outlet?.address,
    city: outlet?.city,
    state: outlet?.state,
    country: outlet?.country,
    pincode: outlet?.pincode,
    location: outlet?.location,
    contactNumber: outlet?.contactNumber,
    status: outlet?.status,
    isActive: outlet?.isActive,
  };

  return outletData ? outletData : null;
};

export const getOutletDetailsByAdminIdService = async (adminId: string) => {
  const outlet = await Outlet.findOne({ adminId: adminId });
  // if (!outlet) {
  //   throw new Error(RESPONSE_ERROR_MESSAGES.OUTLET_NOT_FOUND);
  // }

  const outletData = {
    id: outlet?._id,
    adminId: outlet?.adminId,
    name: outlet?.name,
    address: outlet?.address,
    city: outlet?.city,
    state: outlet?.state,
    country: outlet?.country,
    pincode: outlet?.pincode,
    location: outlet?.location,
    contactNumber: outlet?.contactNumber,
    status: outlet?.status,
    isActive: outlet?.isActive,
  };

  return outletData ? outletData : null;
};

export const getAllOutletDetailsService = async (
  token: string,
  city?: string
) => {
  const query: any = {};
  if (city) query.city = city;

  const outletsData = await Outlet.find(query);

  const outlets = await Promise.all(
    outletsData.map(async (outlet) => {
      const response = await adminClient.get(
        `/get-outlet-admin-profile-by-id/${outlet.adminId}`,
        token
      );
      const { data: adminData } = response.data;

      return {
        id: outlet?._id,
        adminId: {
          id: adminData?.id,
          userId: adminData?.userId,
          firstName: adminData?.firstName,
          lastName: adminData?.lastName,
          email: adminData?.email,
          profileImage: adminData?.profileImage,
        },
        name: outlet?.name,
        address: outlet?.address,
        city: outlet?.city,
        state: outlet?.state,
        country: outlet?.country,
        pincode: outlet?.pincode,
        location: outlet?.location,
        contactNumber: outlet?.contactNumber,
        status: outlet?.status,
        isActive: outlet?.isActive,
      };
    })
  );

  return { outlets };
};

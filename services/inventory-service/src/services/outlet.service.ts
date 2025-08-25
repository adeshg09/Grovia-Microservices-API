import axios from "axios";
import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { envConfig } from "../config/env.config";
import {
  createVendorOutletDto,
  getAllOutletDetailsDto,
  getNearestOutletDetailsByLocationCoordinatesDto,
} from "../dtos/outlet.dtos";
import { Outlet } from "../models/outlet.model";
import { adminClient } from "../config/axios.config";
import { getDistanceInKm } from "../utils";

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
    servingRadiusInKm,
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
    !servingRadiusInKm ||
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
    servingRadiusInKm,
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

export const getOutletsDetailByAdminIdsService = async (adminIds: string[]) => {
  const outlets = await Outlet.find({ adminId: { $in: adminIds } });

  return outlets.map((outlet) => ({
    id: outlet._id,
    adminId: outlet.adminId,
    name: outlet.name,
    address: outlet.address,
    city: outlet.city,
    state: outlet.state,
    country: outlet.country,
    pincode: outlet.pincode,
    location: outlet.location,
    contactNumber: outlet.contactNumber,
    status: outlet.status,
    isActive: outlet.isActive,
  }));
};

export const getAllOutletDetailsService = async (
  // token: string,
  queryParams: getAllOutletDetailsDto
) => {
  console.log("queryParams", queryParams);
  const outletsData = await Outlet.find(queryParams);

  const outlets = await Promise.all(
    outletsData.map(async (outlet: any) => {
      // const response = await adminClient.get(
      //   `/get-outlet-admin-profile-by-id/${outlet.adminId}`,
      //   token
      // );
      // const { data: adminData } = response.data;

      return {
        id: outlet?._id,
        // adminId: {
        //   id: adminData?.id,
        //   userId: adminData?.userId,
        //   firstName: adminData?.firstName,
        //   lastName: adminData?.lastName,
        //   email: adminData?.email,
        //   profileImage: adminData?.profileImage,
        // },
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

export const getNearestOutletDetailsByLocationCoordinatesService = async (
  queryParams: any
) => {
  const { latitude, longitude } = queryParams;

  const userLocationCoordinates: [number, number] = [
    parseFloat(longitude as string),
    parseFloat(latitude as string),
  ];

  // Get outlets sorted by nearest first using MongoDB's $near
  const allOutlets = await Outlet.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userLocationCoordinates,
        },
        $maxDistance: 10000 * 1000,
      },
    },
  });

  const nearestOutletDetails = allOutlets.find((outlet: any) => {
    const [outletLongitude, outletLatitude] = outlet.location.coordinates;
    const distance = getDistanceInKm(userLocationCoordinates, [
      outletLongitude,
      outletLatitude,
    ]);
    return distance <= outlet.servingRadiusInKm;
  });

  if (!nearestOutletDetails) {
    throw new Error(
      JSON.stringify(RESPONSE_ERROR_MESSAGES.NEAREST_OUTLET_NOT_FOUND)
    );
  }

  return nearestOutletDetails;
};

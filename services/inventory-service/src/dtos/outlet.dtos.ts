export interface createVendorOutletDto {
  adminId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  servingRadiusInKm: number;
  contactNumber: string;
}

export interface getAllOutletDetailsDto {
  city?: string;
  adminId?: string;
}

export interface getNearestOutletDetailsByLocationCoordinatesDto {
  latitude: number | string;
  longitude: number | string;
}

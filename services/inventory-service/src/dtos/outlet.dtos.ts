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
  contactNumber: string;
}

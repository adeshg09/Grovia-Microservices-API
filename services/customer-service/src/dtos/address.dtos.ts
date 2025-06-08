export interface addCustomerAddressDto {
  tag: string;
  completeAddress: string;
  street?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  landmark?: string;
  isDefault?: boolean;
}

import { RESPONSE_ERROR_MESSAGES, USER_ROLES } from "../constants";
import { addCustomerAddressDto } from "../dtos/address.dtos";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";

export const addCustomerAddress = async (
  addCustomerAddressData: addCustomerAddressDto,
  customerId: string
) => {
  const {
    tag,
    completeAddress,
    street,
    city,
    state,
    postalCode,
    country = "India",
    coordinates,
    landmark,
    isDefault = false,
  } = addCustomerAddressData;

  if (
    !tag ||
    !completeAddress ||
    !city ||
    !state ||
    !postalCode ||
    !coordinates
  ) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new Error(RESPONSE_ERROR_MESSAGES.CUSTOMER_PROFILE_NOT_FOUND);
  }

  const newAddress = new Address({
    customerId: customerId,
    tag,
    completeAddress,
    street,
    city,
    state,
    postalCode,
    country,
    coordinates: {
      type: "Point",
      coordinates: [coordinates.longitude, coordinates.latitude],
    },
    landmark,
    isDefault,
  });

  await newAddress.save();

  await Customer.findByIdAndUpdate(customerId, {
    $push: { addresses: newAddress._id },
  });

  return {
    address: {
      id: newAddress._id,
      customerId: newAddress.customerId,
      tag: newAddress.tag,
      completeAddress: newAddress.completeAddress,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      postalCode: newAddress.postalCode,
      country: newAddress.country,
      coordinates: {
        latitude: newAddress.coordinates.coordinates[1],
        longitude: newAddress.coordinates.coordinates[0],
      },
      landmark: newAddress.landmark,
      isDefault: newAddress.isDefault,
    },
  };
};

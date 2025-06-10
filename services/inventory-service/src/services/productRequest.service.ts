import { ProductRequest } from "../models/productRequest.model";
import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { createProductRequestDto } from "../dtos/productRequest.dtos";
import { adminClient, inventoryClient } from "../config/axios.config";

export const createProductRequestService = async (
  createProductRequestData: createProductRequestDto,
  userId: string,
  token: string
) => {
  const { products } = createProductRequestData;
  if (!products || products.length === 0) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const adminResponse = await adminClient.get(
    `/admin/get-outlet-admin-profile-by-userId/${userId}`,
    token
  );

  const { data: adminData } = adminResponse.data;

  const outletResonse = await inventoryClient.get(
    `/outlets/get-outlet-details-by-adminId/${adminData._id}`,
    token
  );

  const { data: outletData } = outletResonse.data;

  const productRequest = new ProductRequest({
    outlet: outletData._id,
    requestedBy: adminData?._id,
    products,
  });

  await productRequest.save();
  return { productRequest };
};

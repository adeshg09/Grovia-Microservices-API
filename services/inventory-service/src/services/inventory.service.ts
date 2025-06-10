import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { Inventory } from "../models/inventory.model";
import { createInventoryDto } from "../dtos/inventory.dtos";

export const createInventoryRecord = async (
  createInventoryData: createInventoryDto
) => {
  const { outletId, productId, stock, price, discount, status, isAvailable } =
    createInventoryData;

  if (!outletId || !productId || !stock || !price) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const existingInventory = await Inventory.findOne({ outletId, productId });
  if (existingInventory) {
    throw new Error(RESPONSE_ERROR_MESSAGES.INVENTORY_ALREADY_EXISTS);
  }

  const inventory = new Inventory({
    outletId,
    productId,
    stock,
    price,
    discount,
    status,
    isAvailable,
  });
  await inventory.save();
  return { inventory };
};

export const getInventoryDetailsByIdService = async (inventoryId: string) => {
  const inventory = await Inventory.findById(inventoryId);

  const inventoryData = {
    outletId: inventory?.outletId,
    productId: inventory?.productId,
    stock: inventory?.stock,
    price: inventory?.price,
    discount: inventory?.discount,
    status: inventory?.status,
    isAvailable: inventory?.isAvailable,
  };

  return inventoryData ? inventoryData : null;
};

export const getInventoryDetailsByOutletIdService = async (
  outletId: string
) => {
  const inventory = await Inventory.findOne({ outletId: outletId });

  const inventoryData = {
    outletId: inventory?.outletId,
    productId: inventory?.productId,
    stock: inventory?.stock,
    price: inventory?.price,
    discount: inventory?.discount,
    status: inventory?.status,
    isAvailable: inventory?.isAvailable,
  };

  return inventoryData ? inventoryData : null;
};

export const getInventoryDetailsByProductIdService = async (
  productId: string
) => {
  const inventory = await Inventory.findOne({ productId: productId });

  const inventoryData = {
    outletId: inventory?.outletId,
    productId: inventory?.productId,
    stock: inventory?.stock,
    price: inventory?.price,
    discount: inventory?.discount,
    status: inventory?.status,
    isAvailable: inventory?.isAvailable,
  };

  return inventoryData ? inventoryData : null;
};

export const getAllInventoryDetailsService = async () => {
  const inventoriesData = await Inventory.find()
    .populate({
      path: "outletId",
      select:
        "adminId name address city state country pincode location contactNumber captains status isActive",
    })
    .populate({
      path: "productId",
      select: "name description categoryId image brand quantity unit isActive",
      populate: {
        path: "categoryId",
        select: "name description image",
      },
    });

  const inventories = inventoriesData.map((inventory: any) => ({
    id: inventory._id,
    outlet: {
      adminId: inventory.outletId.adminId,
      id: inventory.outletId._id,
      name: inventory.outletId.name,
      address: inventory.outletId.address,
      city: inventory.outletId.city,
      state: inventory.outletId.state,
      country: inventory.outletId.country,
      pincode: inventory.outletId.pincode,
      location: inventory.outletId.location,
      contactNumber: inventory.outletId.contactNumber,
      captains: inventory.outletId.captains,
      status: inventory.outletId.status,
      isActive: inventory.outletId.isActive,
    },
    product: {
      id: inventory.productId._id,
      name: inventory.productId.name,
      description: inventory.productId.description,
      image: inventory.productId.image,
      brand: inventory.productId.brand,
      quantity: inventory.productId.quantity,
      unit: inventory.productId.unit,
      isActive: inventory.productId.isActive,
      category: {
        id: inventory.productId.categoryId._id,
        name: inventory.productId.categoryId.name,
        description: inventory.productId.categoryId.description,
        image: inventory.productId.categoryId.image,
      },
    },
    stock: inventory.stock,
    price: inventory.price,
    discount: inventory.discount,
    status: inventory.status,
    isAvailable: inventory.isAvailable,
  }));

  return { inventories };
};

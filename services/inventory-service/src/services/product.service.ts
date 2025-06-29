import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { Product } from "../models/product.model";
import { createProductDto } from "../dtos/product.dtos";

export const createNewProduct = async (createProductData: createProductDto) => {
  const { name, description, categoryId, image, brand, quantity, unit } =
    createProductData;

  if (!name || !categoryId || !image || !quantity || !unit) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const product = new Product({
    name,
    description,
    categoryId,
    image,
    brand,
    quantity,
    unit,
  });
  await product.save();
  return { product };
};

export const getProductDetailsByIdService = async (productId: string) => {
  const product = await Product.findById(productId).populate(
    "categoryId",
    "name description image"
  );

  return {
    id: product?._id,
    name: product?.name,
    description: product?.description,
    category: product?.categoryId,
    images: product?.images,
    brand: product?.brand,
    quantity: product?.quantity,
    unit: product?.unit,
    isActive: product?.isActive,
  };
};

export const getAllProductsService = async () => {
  const productsData = await Product.find().populate(
    "categoryId",
    "name description image"
  );

  const products = productsData.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    category: product.categoryId,
    images: product.images,
    brand: product.brand,
    quantity: product.quantity,
    unit: product.unit,
    isActive: product.isActive,
  }));

  return { products };
};

import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { Product } from "../models/product.model";
import { createProductDto } from "../dtos/product.dtos";

export const createNewProduct = async (createProductData: createProductDto) => {
  const {
    name,
    slug,
    description,
    categoryId,
    subCategoryId,
    images,
    thumbnail,
    brand,
    quantity,
    unit,
    isActive,
  } = createProductData;

  if (
    !name ||
    !slug ||
    !description ||
    !categoryId ||
    !subCategoryId ||
    !quantity ||
    !unit
  ) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const product = new Product({
    name,
    slug,
    description,
    categoryId,
    subCategoryId,
    images,
    thumbnail,
    brand,
    quantity,
    unit,
    isActive,
  });
  await product.save();
  return { product };
};

export const getProductDetailsByIdService = async (productId: string) => {
  const product = await Product.findById(productId).populate(
    "categoryId subCategoryId"
  );

  return {
    id: product?._id,
    name: product?.name,
    slug: product?.slug,
    description: product?.description,
    category: product?.categoryId,
    subCategory: product?.subCategoryId,
    images: product?.images,
    thumbnail: product?.thumbnail,
    brand: product?.brand,
    quantity: product?.quantity,
    unit: product?.unit,
    isActive: product?.isActive,
  };
};

export const getAllProductsService = async () => {
  const productsData = await Product.find().populate(
    "categoryId subCategoryId"
  );

  const products = productsData.map((product) => ({
    id: product._id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.categoryId,
    subCategory: product.subCategoryId,
    images: product.images,
    thumbnail: product.thumbnail,
    brand: product.brand,
    quantity: product.quantity,
    unit: product.unit,
    isActive: product.isActive,
  }));

  return { products };
};

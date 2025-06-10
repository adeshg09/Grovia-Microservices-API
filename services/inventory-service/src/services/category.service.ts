import axios from "axios";
import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { envConfig } from "../config/env.config";
import { Category } from "../models/category.model";
import { createProductCategoryDto } from "../dtos/category.dtos";

export const createProductCategory = async (
  createProductCategoryData: createProductCategoryDto
) => {
  const { name, description, image } = createProductCategoryData;

  if (!name) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const category = new Category({
    name,
    description,
    image,
  });
  await category.save();
  return { category };
};

export const getCategoryDetailsByIdService = async (categoryId: string) => {
  const category = await Category.findById(categoryId);

  const categoryData = {
    name: category?.name,
    description: category?.description,
    image: category?.image,
  };

  return categoryData ? categoryData : null;
};

export const getAllCategoriesService = async () => {
  const categoriesData = await Category.find();

  const categories = categoriesData.map((category) => ({
    id: category._id,
    name: category.name,
    description: category.description,
    image: category.image,
  }));

  return { categories };
};

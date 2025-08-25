import axios from "axios";
import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { envConfig } from "../config/env.config";
import { Category, ICategory } from "../models/category.model";
import {
  createProductCategoryDto,
  getAllCategoriesDto,
} from "../dtos/category.dtos";

export const createProductCategory = async (
  createProductCategoryData: createProductCategoryDto
) => {
  const { name, slug, description, image, parentCategoryId } =
    createProductCategoryData;

  if (!name || !slug) {
    throw new Error(RESPONSE_ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  const category = new Category({
    name,
    slug,
    description,
    image,
    parentCategoryId,
  });
  await category.save();
  return { category };
};

export const getCategoryDetailsByIdService = async (categoryId: string) => {
  const category = await Category.findById(categoryId);

  const categoryData = {
    name: category?.name,
    slug: category?.slug,
    description: category?.description,
    image: category?.image,
    parentCategoryId: category?.parentCategoryId,
  };

  return categoryData ? categoryData : null;
};

export const getAllCategoriesService = async (
  queryParams: getAllCategoriesDto
) => {
  const { parentCategoryId, page = 1, limit = 10 } = queryParams;

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skipSize = (pageNumber - 1) * pageSize;

  // ---------------------
  // Case 1: Subcategories of a specific parent
  // ---------------------
  if (parentCategoryId) {
    console.log("check");
    const [subcategories, totalSubcategories] = await Promise.all([
      Category.find({ parentCategoryId }).skip(skipSize).limit(pageSize),
      Category.countDocuments({ parentCategoryId }),
    ]);

    const formattedSubcategories = subcategories.map((category: any) => ({
      id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      parentCategoryId: category.parentCategoryId,
    }));

    return {
      categories: formattedSubcategories,
      totalRecords: totalSubcategories,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalSubcategories / pageSize),
    };
  }

  // ---------------------
  // Case 2: Parent Categories with Their Children
  // ---------------------
  const [parentCategories, totalParentCategories] = await Promise.all([
    Category.find({ parentCategoryId: null }).skip(skipSize).limit(pageSize),
    Category.countDocuments({ parentCategoryId: null }),
  ]);
  console.log("check2");

  const parentCategoryIds = parentCategories.map((cat: any) => cat._id);

  // Fetch all children for the fetched parents
  const childCategories = await Category.find({
    parentCategoryId: { $in: parentCategoryIds },
  });

  const childrenGroupedByParent = new Map<string, any[]>();
  childCategories.forEach((child: any) => {
    const parentId = String(child.parentCategoryId);
    if (!childrenGroupedByParent.has(parentId)) {
      childrenGroupedByParent.set(parentId, []);
    }

    childrenGroupedByParent.get(parentId)!.push({
      id: child._id,
      name: child.name,
      slug: child.slug,
      description: child.description,
      image: child.image,
      parentCategoryId: child.parentCategoryId,
    });
  });

  // Attach children to their parent
  const formattedCategories = parentCategories.map((parent: any) => ({
    id: parent._id,
    name: parent.name,
    slug: parent.slug,
    description: parent.description,
    image: parent.image,
    parentCategoryId: parent.parentCategoryId,
    children: childrenGroupedByParent.get(String(parent._id)) || [],
  }));

  return {
    categories: formattedCategories,
    totalRecords: totalParentCategories,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalParentCategories / pageSize),
  };
};

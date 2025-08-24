export interface createProductCategoryDto {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategoryId?: string;
}

export interface getAllCategoriesDto {
  parentCategoryId?: string;
  page?: number;
  limit?: number;
}

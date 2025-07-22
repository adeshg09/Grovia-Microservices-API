export interface createProductCategoryDto {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategoryId?: string;
}

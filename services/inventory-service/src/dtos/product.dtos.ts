export interface createProductDto {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  images: string[];
  thumbnail: string;
  brand?: string;
  quantity: number;
  unit: string;
  isActive: boolean;
}

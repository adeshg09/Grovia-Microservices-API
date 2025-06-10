export interface createProductDto {
  name: string;
  description: string;
  categoryId: string;
  image: string;
  brand?: string;
  quantity: number;
  unit: string;
}

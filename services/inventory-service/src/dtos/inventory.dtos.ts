export interface createInventoryDto {
  outletId: string;
  productId: string;
  stock: number;
  price: number;
  discount?: number;
  status?: string;
  isAvailable?: boolean;
}

export interface getInventoryProductDetailsByOutletIdDto {
  outletId?: string;
  categoryId?: string;
  subCategoryId?: string;
  page?: number;
  limit?: number;
}

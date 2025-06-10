export interface createInventoryDto {
  outletId: string;
  productId: string;
  stock: number;
  price: number;
  discount?: number;
  status?: string;
  isAvailable?: boolean;
}

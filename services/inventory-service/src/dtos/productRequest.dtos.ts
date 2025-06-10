export interface createProductRequestDto {
  products: {
    productId: string;
    quantity: number;
    remarks?: string;
  }[];
}

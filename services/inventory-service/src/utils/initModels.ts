import { Category } from "../models/category.model";
import { Inventory } from "../models/inventory.model";
import { Outlet } from "../models/outlet.model";
import { Product } from "../models/product.model";
import { ProductRequest } from "../models/productRequest.model";

const modelsToInit = [
  { model: Category, name: "Category" },
  { model: Inventory, name: "Inventory" },
  { model: Outlet, name: "Outlet" },
  { model: Product, name: "Product" },
  { model: ProductRequest, name: "ProductRequest" },
];

export const initModels = async () => {
  for (const { model, name } of modelsToInit) {
    try {
      await model.init();
      console.log(`✅ ${name} model initialized (inventory service)`);
    } catch (error) {
      console.error(`❌ Error initializing ${name} model:`, error);
    }
  }
};

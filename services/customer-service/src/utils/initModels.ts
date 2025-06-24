import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";

const modelsToInit = [
  { model: Customer, name: "Customer" },
  { model: Address, name: "Address" },
];

export const initModels = async () => {
  for (const { model, name } of modelsToInit) {
    try {
      await model.init();
      console.log(`✅ ${name} model initialized (customer service)`);
    } catch (error) {
      console.error(`❌ Error initializing ${name} model:`, error);
    }
  }
};

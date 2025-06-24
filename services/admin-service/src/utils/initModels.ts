import { Admin } from "../models/admin.model";

const modelsToInit = [{ model: Admin, name: "Admin" }];

export const initModels = async () => {
  for (const { model, name } of modelsToInit) {
    try {
      await model.init();
      console.log(`✅ ${name} model initialized (admin service)`);
    } catch (error) {
      console.error(`❌ Error initializing ${name} model:`, error);
    }
  }
};

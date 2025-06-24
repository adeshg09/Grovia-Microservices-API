import { User } from "../models/auth.user.model";

const modelsToInit = [{ model: User, name: "User" }];

export const initModels = async () => {
  for (const { model, name } of modelsToInit) {
    try {
      await model.init();
      console.log(`✅ ${name} model initialized (auth service)`);
    } catch (error) {
      console.error(`❌ Error initializing ${name} model:`, error);
    }
  }
};

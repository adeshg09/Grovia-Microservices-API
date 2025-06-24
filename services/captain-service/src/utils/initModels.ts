import { Captain } from "../models/captain.model";
import { KycDetails } from "../models/kycdetails.model";

const modelsToInit = [
  { model: Captain, name: "Captain" },
  { model: KycDetails, name: "KycDetails" },
];

export const initModels = async () => {
  for (const { model, name } of modelsToInit) {
    try {
      await model.init();
      console.log(`✅ ${name} model initialized (captain service)`);
    } catch (error) {
      console.error(`❌ Error initializing ${name} model:`, error);
    }
  }
};

import { envConfig } from "../config/env.config";
import { Admin } from "../models/admin.model";
import { subscribeToQueue } from "../utils/rabbitmq";

export const userCreatedConsumer = async () => {
  try {
    await subscribeToQueue("user_created_queue", async (msg) => {
      if (!msg) return;
      const { userId, role, phoneNumber } = JSON.parse(msg.content.toString());

      if (role === "super-admin") {
        const exisitingSuperAdmin = await Admin.findOne({
          userId,
        });
        if (!exisitingSuperAdmin) {
          const newSuperAdmin = new Admin({
            userId,
            firstName: envConfig.SUPER_ADMIN_First_Name,
            lastName: envConfig.SUPER_ADMIN_LAST_Name,
            email: envConfig.SUPER_ADMIN_EMAIL,
          });
          await newSuperAdmin.save();
          console.log(
            "✅ SuperAdmin profile created in admin-service for:",
            phoneNumber
          );
        }
      }
    });
  } catch (error: any) {
    console.error("Error in userCreatedConsumer:", error.message || error);
  }
};

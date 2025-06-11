import { envConfig } from "../config/env.config";
import { USER_ROLES } from "../constants";
import { Admin } from "../models/admin.model";
import { publishToQueue, subscribeToQueue } from "../utils/rabbitmq";

export const userCreatedConsumer = async () => {
  try {
    await subscribeToQueue("user_created_queue", async (msg) => {
      if (!msg) return;
      const { userId, role, phoneNumber } = JSON.parse(msg.content.toString());

      if (role === USER_ROLES.SUPER_ADMIN) {
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

          await publishToQueue(
            "superAdmin_created_queue",
            JSON.stringify({
              adminId: newSuperAdmin._id,
              userId: newSuperAdmin.userId,
              firstName: newSuperAdmin.firstName,
              lastName: newSuperAdmin.lastName,
              email: newSuperAdmin.email,
            })
          );
        }
      } else if (role === USER_ROLES.OUTLET_ADMIN) {
        const existingDefaultOutletAdmin = await Admin.findOne({ userId });
        if (!existingDefaultOutletAdmin) {
          const newDefaultOutletAdmin = new Admin({
            userId,
            firstName: envConfig.SUPER_ADMIN_First_Name,
            lastName: envConfig.SUPER_ADMIN_LAST_Name,
            email: envConfig.DEFAULT_OUTLET_ADMIN_EMAIL,
          });
          await newDefaultOutletAdmin.save();
          console.log(
            "✅ Outlet Admin profile created in admin-service for:",
            phoneNumber
          );

          await publishToQueue(
            "defaultOutletAdmin_created_queue",
            JSON.stringify({
              adminId: newDefaultOutletAdmin._id,
              userId: newDefaultOutletAdmin.userId,
              firstName: newDefaultOutletAdmin.firstName,
              lastName: newDefaultOutletAdmin.lastName,
              email: newDefaultOutletAdmin.email,
            })
          );
        }
      }
    });
  } catch (error: any) {
    console.error("❌ Error in userCreatedConsumer:", error.message || error);
  }
};

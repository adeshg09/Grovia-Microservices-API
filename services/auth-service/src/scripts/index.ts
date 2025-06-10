import { envConfig } from "../config/env.config";
import { USER_STATUS } from "../constants";
import { User } from "../models/auth.user.model";
import { publishToQueue } from "../utils/rabbitmq";

export const seedSuperadmin = async () => {
  try {
    const user = await User.findOne({
      phoneNumber: envConfig.SUPER_ADMIN_PHONE_NUMBER,
      role: envConfig.SUPER_ADMIN_ROLE,
    });
    if (!user) {
      const newUser = new User({
        phoneNumber: envConfig.SUPER_ADMIN_PHONE_NUMBER,
        role: envConfig.SUPER_ADMIN_ROLE,
        status: USER_STATUS.ACTIVE,
        isActivated: true,
        isPhoneVerified: true,
      });
      await newUser.save();
      await publishToQueue("user_created_queue", {
        userId: newUser._id,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
      });
      console.log(
        "✅ Superadmin User seeded in auth-service and event published."
      );
    } else {
      console.log("Superadmin User already exists.");
    }
  } catch (error: any) {
    console.error("Error seeding superadmin:", error.message || error);
  }
};

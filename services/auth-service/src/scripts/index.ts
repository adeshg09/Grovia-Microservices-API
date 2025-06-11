import { envConfig } from "../config/env.config";
import { USER_ROLES, USER_STATUS } from "../constants";
import { User } from "../models/auth.user.model";
import { publishToQueue } from "../utils/rabbitmq";

export const seedSuperadmin = async () => {
  try {
    // 1. Create Superadmin User
    const superAdminUser = await User.findOne({
      phoneNumber: envConfig.SUPER_ADMIN_PHONE_NUMBER,
      role: envConfig.SUPER_ADMIN_ROLE,
    });

    if (!superAdminUser) {
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

    // 2. Create Admin User (same phone, different role)
    const outletAdminUser = await User.findOne({
      phoneNumber: envConfig.SUPER_ADMIN_PHONE_NUMBER,
      role: USER_ROLES.OUTLET_ADMIN,
    });

    if (!outletAdminUser) {
      const newUser = new User({
        phoneNumber: envConfig.SUPER_ADMIN_PHONE_NUMBER,
        role: USER_ROLES.OUTLET_ADMIN,
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
      console.log("✅ Default outlet admin user created and event published.");
    } else {
      console.log("Outlet admin user already exists.");
    }
  } catch (error: any) {
    console.error("Error seeding superadmin:", error.message || error);
  }
};

import { subscribeToQueue } from "../utils/rabbitmq";
import { Outlet } from "../models/outlet.model";
import { OUTLET_TYPE, OUTLET_STATUS } from "../constants";
import { envConfig } from "../config/env.config";

export const defaultOutletAdminCreatedConsumer = async () => {
  try {
    await subscribeToQueue("defaultOutletAdmin_created_queue", async (msg) => {
      if (!msg) return;
      console.log("msg", msg);

      const { adminId, userId, firstName, lastName, email } = JSON.parse(
        msg.content.toString()
      );
      const existingOutlet = await Outlet.findOne({ adminId });
      if (!existingOutlet) {
        const outlet = new Outlet({
          adminId,
          name: envConfig.DEFAULT_OUTLET_NAME,
          address: envConfig.DEFAULT_OUTLET_ADDRESS,
          city: envConfig.DEFAULT_OUTLET_CITY,
          state: envConfig.DEFAULT_OUTLET_STATE,
          country: envConfig.DEFAULT_OUTLET_COUNTRY,
          pincode: envConfig.DEFAULT_OUTLET_PINCODE,
          location: {
            type: "Point",
            coordinates: envConfig
              .DEFAULT_OUTLET_LOCATION_COORDINATES!.split(",")
              .map(Number),
          },
          contactNumber: envConfig.DEFAULT_OUTLET_CONTACTNUMBER,
          type: OUTLET_TYPE.PRIMARY,
          status: OUTLET_STATUS.OPEN,
          isActive: true,
          isDefault: true,
        });

        await outlet.save();
        console.log(
          `✅ Default outlet ${outlet.name} created for default outlet admin`
        );
      } else {
        console.log(
          "ℹ️ Default outlet already exists for this default outlet admin."
        );
      }
    });
  } catch (error: any) {
    console.error(
      "❌ Error in defaultOutletAdminCreatedConsumer:",
      error.message || error
    );
  }
};

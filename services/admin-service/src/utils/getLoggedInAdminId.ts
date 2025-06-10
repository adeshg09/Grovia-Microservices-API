import { Admin } from "../models/admin.model";

export const getLoggedInAdminId = async (userId: string) => {
  const admin = await Admin.findOne({ userId });
  if (!admin) throw new Error("Admin profile not found");
  return admin._id;
};

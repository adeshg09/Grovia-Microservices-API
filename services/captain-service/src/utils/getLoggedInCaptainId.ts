import { RESPONSE_ERROR_MESSAGES } from "../constants";
import { Captain } from "../models/captain.model";

export const getLoggedInCaptainId = async (userId: string) => {
  const captain = await Captain.findOne({ userId });
  if (!captain)
    throw new Error(RESPONSE_ERROR_MESSAGES.CAPTAIN_PROFILE_NOT_FOUND);
  return captain._id;
};

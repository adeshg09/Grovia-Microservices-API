import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../models/auth.user.model";
import { TokenPayload } from "../dtos/auth.dtos";
import { TOKEN_EXPIRY } from "../constants";

// Function to generate tokens
export const generateTokens = (
  user: IUser,
  outletId?: string,
  rememberMe?: boolean
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role, outletId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: TOKEN_EXPIRY.ACCESS } as SignOptions
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role, outletId },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: rememberMe ? TOKEN_EXPIRY.REMEMBER_ME : TOKEN_EXPIRY.REFRESH,
    } as SignOptions
  );

  return { accessToken, refreshToken };
};

// Function to verify the token and extract payload
export const verifyToken = (
  token: string,
  secret: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

// Function to generate temp token
export const generateTempToken = (
  payload: JwtPayload
): { tempToken: string } => {
  const tempToken = jwt.sign(
    payload,
    process.env.TEMP_TOKEN_SECRET as string,
    {
      expiresIn: TOKEN_EXPIRY.TEMP,
    } as SignOptions
  );

  return { tempToken };
};

// Function to verify temp token
export const verifyTempToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(
      token,
      process.env.TEMP_TOKEN_SECRET as string
    ) as JwtPayload;
  } catch (error) {
    return null;
  }
};

import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/app.config";
import { StringValue } from "ms";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  profilePicture: string | null;
  currentWorkspace: string | null;
}

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN as StringValue,
    algorithm: "HS256",
  });
};


export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload, 
    config.JWT_REFRESH_SECRET as Secret, 
    {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN as StringValue,
      algorithm: "HS256"
    } as SignOptions,
  );
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as JWTPayload;
};
import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { verifyAccessToken } from "../utils/jwt";
import UserModel from "../models/user.model";

const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Access token required");
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);
    
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedException("Invalid or expired token");
  }
};

export default jwtAuth;
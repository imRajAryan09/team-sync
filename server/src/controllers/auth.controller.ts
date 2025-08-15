import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UnauthorizedException } from "../utils/appError";
import UserModel from "../models/user.model";
import passport from "passport";
import { cookieUtils } from "../utils/cookie.utils";


export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const currentWorkspace = user?.currentWorkspace?.toString();
    if (!currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }
    // Generate JWT tokens
    const accessToken = generateAccessToken({ 
      userId: user._id.toString(), 
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      currentWorkspace: currentWorkspace || null
    });
    const refreshToken = generateRefreshToken({ 
      userId: user._id.toString(), 
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      currentWorkspace: currentWorkspace || null
    });
    
    cookieUtils.setRefreshToken(res, refreshToken);

    res.redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=success`);
  }
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        const currentWorkspace = user.currentWorkspace;
        
        // Generate JWT tokens
        const accessToken = generateAccessToken({ 
          userId: user._id.toString(), 
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          currentWorkspace: currentWorkspace?.toString() || null
        });
        const refreshToken = generateRefreshToken({ 
          userId: user._id.toString(), 
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          currentWorkspace: currentWorkspace?.toString() || null
        });

        cookieUtils.setRefreshToken(res, refreshToken);

        const responseData = {
          message: "Logged in successfully",
          user,
          accessToken,
        };
        
        console.log('Login API Response:', JSON.stringify(responseData, null, 2));
        
        return res.status(HTTPSTATUS.OK).json(responseData);
      }
    )(req, res, next);
  }
);

export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    cookieUtils.clearRefreshToken(res);
    
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Logged out successfully" });
  }
);

export const refreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      cookieUtils.clearRefreshToken(res);
      throw new UnauthorizedException("Refresh token required");
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await UserModel.findById(decoded.userId).select("-password").populate('currentWorkspace', '_id');
      
      if (!user) {
        cookieUtils.clearRefreshToken(res);
        throw new UnauthorizedException("User not found");
      }

      const newAccessToken = generateAccessToken({ 
        userId: user._id.toString(), 
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        currentWorkspace: user.currentWorkspace?._id?.toString() || user.currentWorkspace?.toString() || null
      });

      return res.status(HTTPSTATUS.OK).json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      cookieUtils.clearRefreshToken(res);
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
);

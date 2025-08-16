import { Response } from "express";
import { config } from "../config/app.config";
import ms, { StringValue } from "ms";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
});

export const cookieUtils = {
  setRefreshToken: (res: Response, token: string) => {
    const options = {
      ...getCookieOptions(),
      maxAge: ms(config.JWT_REFRESH_EXPIRES_IN as StringValue),
    };
    console.log('Setting cookie with options:', options);
    res.cookie('refreshToken', token, options);
  },

  clearRefreshToken: (res: Response) => {
    res.clearCookie('refreshToken', getCookieOptions());
  }
};
import { Response } from "express";
import { config } from "../config/app.config";
import ms, { StringValue } from "ms";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: config.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
  domain: config.NODE_ENV === 'production' ? undefined : undefined
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
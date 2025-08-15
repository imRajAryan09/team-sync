import { Response } from "express";
import { config } from "../config/app.config";
import ms, { StringValue } from "ms";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: config.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/'
});

export const cookieUtils = {
  setRefreshToken: (res: Response, token: string) => {
    res.cookie('refreshToken', token, {
      ...getCookieOptions(),
      maxAge: ms(config.JWT_REFRESH_EXPIRES_IN as StringValue),
    });
  },

  clearRefreshToken: (res: Response) => {
    res.clearCookie('refreshToken', getCookieOptions());
  }
};
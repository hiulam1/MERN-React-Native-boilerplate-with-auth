import { Request, Response, NextFunction } from "express";

import {
  extractAccessToken,
  extractRefreshToken,
  isTokenBlacklisted,
} from "../services/authServices.js";
import { AuthenticationError } from "../../utils/ErrorClasses.js";

export const checkTokenBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractAccessToken(req);
  const refreshToken = extractRefreshToken(req);
  const accessTokenBlacklisted = accessToken
    ? await isTokenBlacklisted(accessToken)
    : false;
  const refreshTokenBlacklisted = refreshToken
    ? await isTokenBlacklisted(refreshToken)
    : false;
  if (!accessToken && !refreshToken) {
    next(new AuthenticationError("No tokens provided."));
  } else if (accessTokenBlacklisted || refreshTokenBlacklisted) {
    next(new AuthenticationError("Token has been revoked."));
  }
  next();
};

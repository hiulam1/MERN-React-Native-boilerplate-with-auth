import { Request, Response, NextFunction } from "express";
import extractAccessTokenFromHeader from "../utils/extractAccessToken.js";

import redisClient from "../../services/redis.js";

export const checkTokenBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractAccessTokenFromHeader(req);
  const refreshToken = req.headers["x-refresh-token"] as string;
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "No access token provided." });
  }
  const isBlacklisted = await redisClient.get(`blacklist:${accessToken}`);
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token has been revoked." });
  }
  const refreshIsBlacklisted = await redisClient.get(
    `blacklist:${accessToken}`
  );
  if (refreshIsBlacklisted) {
    return res.status(401).json({ message: "Token has been revoked." });
  }
  next();
};

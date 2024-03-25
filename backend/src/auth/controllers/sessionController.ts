import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import {
  blacklistToken,
  decodeToken,
  extractAccessToken,
  extractRefreshToken,
  generateAccessToken,
  verifyToken,
} from "../services/authServices.js";

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = extractRefreshToken(req);
  if (!refreshToken) {
    console.log("no refresh token");
    return next(new Error("Refresh Token is required"));
  }

  try {
    const decoded = verifyToken(refreshToken);
    const userID = (decoded as any).id;
    const newAccessToken = generateAccessToken(userID);
    console.log("decoded: " + decoded);
    console.log("userID: " + userID);
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractAccessToken(req);
  const refreshToken = extractRefreshToken(req);
  console.log(req.headers);

  if (!accessToken || !refreshToken) {
    console.log("missing tokens");
    return next(new Error("missing tokens"));
  }

  try {
    const decodedAccess = decodeToken(accessToken);
    const decodedRefresh = decodeToken(refreshToken);
    const now = Math.floor(Date.now() / 1000);
    if (!decodedAccess?.exp || !decodedRefresh?.exp) {
      throw new Error("Invalid token payload: missing 'exp'");
    }

    // Calculate remaining TTL for Redis
    const accessTTL = decodedAccess!.exp - now;
    const refreshTTL = decodedRefresh!.exp - now;

    // Add tokens to blacklist

    await blacklistToken(accessToken, accessTTL);
    await blacklistToken(refreshToken, refreshTTL);

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout failed:", error);
    next(error);
  }
};

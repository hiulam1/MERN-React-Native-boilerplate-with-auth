import { Request, Response } from "express";
import extractAccessTokenFromHeader from "../utils/extractAccessToken.js";
import redisClient from "../../services/redis.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const logoutController = async (req: Request, res: Response) => {
  const accessToken = extractAccessTokenFromHeader(req);
  const refreshToken = req.headers["x-refresh-token"] as string;
  console.log(req.headers);

  if (!accessToken || !refreshToken) {
    console.log("missing tokens");
    return res.status(400).json({ message: "Missing tokens." });
  }

  try {
    // Decode tokens to get their expiry times
    const decodedAccess = jwt.decode(accessToken) as JwtPayload | null;
    const decodedRefresh = jwt.decode(refreshToken) as JwtPayload | null;
    const now = Math.floor(Date.now() / 1000);
    if (!decodedAccess?.exp || !decodedRefresh?.exp) {
      throw new Error("Invalid token payload: missing 'exp'");
    }
    // Calculate remaining TTL for Redis
    const accessTTL = decodedAccess!.exp - now;
    const refreshTTL = decodedRefresh!.exp - now;

    // Add tokens to blacklist
    await redisClient.set(`blacklist:${accessToken}`, "true", {
      EX: accessTTL,
    });
    await redisClient.set(`blacklist:${refreshToken}`, "true", {
      EX: refreshTTL,
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ message: "Logout failed." });
  }
};
export default logoutController;

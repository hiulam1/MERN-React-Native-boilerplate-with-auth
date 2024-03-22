import { Request, Response, NextFunction } from "express";
import extractTokenFromHeader from "../utils/extractAccessToken.js";
import redisClient from "../../services/redis.js";

declare global {
  namespace Express {
    interface Request {
      userExists?: any;
      phoneNumber?: string;
    }
  }
}

export const verifyClientSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = extractTokenFromHeader(req);

  if (!sessionToken) {
    return res.status(400).json({
      success: false,
      message: "Session token not in header.",
    });
  }

  // check token
  // if token is valid, then retrieve current step from redis

  try {
    // if token is valid, then retrieve current step from redis
    const sessionData = await redisClient.get(`session:${sessionToken}`);
    if (sessionData) {
      const { phoneNumber } = JSON.parse(sessionData);
      req.phoneNumber = phoneNumber;

      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid session token.",
      });
    }
  } catch (error) {
    console.error("Error checking session token:", error);
    res.status(500).json({ message: "Failed to check session token" });
  }
};

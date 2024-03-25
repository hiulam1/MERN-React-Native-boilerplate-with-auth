import { Request, Response, NextFunction } from "express";
import redisClient from "../../services/redis.js";
import { extractAccessToken } from "../services/authServices.js";
import {
  InternalServerError,
  InvalidSessionError,
} from "../../utils/ErrorClasses.js";

declare global {
  namespace Express {
    interface Request {
      userExists?: string;
      phoneNumber?: string;
    }
  }
}

export const verifyClientSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = extractAccessToken(req);

  if (!sessionToken) {
    next(new InvalidSessionError("Session token not in header"));
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
      next(new InvalidSessionError("Invalid session token"));
    }
  } catch (error) {
    console.error("Error checking session token:", error);
    next(new InternalServerError());
  }
};

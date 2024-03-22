import mongoose from "mongoose";
import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import redisClient from "../../services/redis.js";
import extractTokenFromHeader from "../../auth/utils/extractAccessToken.js";
declare global {
  namespace Express {
    interface Request {
      userExists?: any;
    }
  }
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, role = "user" } = req.body as {
    email: string;
    role?: string;
  };

  const sessionToken = extractTokenFromHeader(req);

  if (!email || !sessionToken) {
    return res.status(400).json({
      success: false,
      message: "Email or session ID not valid.",
    });
  }

  try {
    const sessionData = await redisClient.get(`session:${sessionToken}`);
    if (!sessionData) {
      return res.status(400).json({
        success: false,
        message: "Session expired or invalid.",
      });
    }
    const { phoneNumber } = JSON.parse(sessionData);

    const user = new User({
      email,
      phoneNumber,
      role,
    });

    await user.save();
    await redisClient.del(`session:${sessionToken}`);
    console.log("user saved");
    req.userExists = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      result: null,
      message: `${error}`,
    });
    console.log(error);
  }
};

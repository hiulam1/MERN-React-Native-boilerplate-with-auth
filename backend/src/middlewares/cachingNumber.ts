import redisClient from "../services/redis.js";
import { Request, Response, NextFunction } from "express";

export const cacheNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userExists) {
      next();
    } else {
      const { phoneNumber } = req.body;
      await redisClient.set(`otp:${phoneNumber}`, "pending", { EX: 600 });
      res
        .status(200)
        .json({ success: true, message: "phoneNumber cached successfully" });
      next();
    }
  } catch (error) {
    console.error("Error caching phone number:", error);
    res.status(500).json({ message: "Failed to cache phone number" });
  }
};

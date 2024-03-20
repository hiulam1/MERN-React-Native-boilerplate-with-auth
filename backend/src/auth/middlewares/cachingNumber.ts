import { randomBytes } from "crypto";
import redisClient from "../../services/redis.js";
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
      const sessionToken = randomBytes(48).toString("hex");
      await redisClient.set(
        `session:${sessionToken}`,
        JSON.stringify({
          phoneNumber: phoneNumber,
          sessionToken: sessionToken,
        }),
        {
          EX: 600,
        }
      );
      res.status(200).json({
        success: true,
        message: "phoneNumber cached successfully",
        sessionToken: sessionToken,
      });
    }
  } catch (error) {
    console.error("Error caching phone number:", error);
    res.status(500).json({ message: "Failed to cache phone number" });
  }
};

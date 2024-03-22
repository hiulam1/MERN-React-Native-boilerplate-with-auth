import { randomBytes } from "crypto";
import redisClient from "../../services/redis.js";
import { Request, Response, NextFunction } from "express";

export const generateSessionToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userExists) {
      next();
    } else {
      const { phoneNumber, currentStep } = req.body;
      const sessionToken = randomBytes(48).toString("hex");
      await redisClient.set(
        `session:${sessionToken}`,
        JSON.stringify({
          phoneNumber: phoneNumber,
          sessionToken: sessionToken,
          currentStep: currentStep,
        }),
        {
          EX: 86400,
        }
      );
      res.status(200).json({
        success: true,
        message: "session Token generated successfully",
        sessionToken: sessionToken,
      });
    }
  } catch (error) {
    console.error("Error caching phone number:", error);
    res.status(500).json({ message: "Failed to cache phone number" });
  }
};

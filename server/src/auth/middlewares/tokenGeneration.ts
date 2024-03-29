import { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  generateSessionToken,
} from "../services/authServices.js";
import { InternalServerError } from "../../utils/ErrorClasses.js";

declare global {
  namespace Express {
    interface Request {
      userExists?: string;
    }
  }
}

export const tokenGeneration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userExists) {
      const accessToken = generateAccessToken(req.userExists);
      const refreshToken = generateRefreshToken(req.userExists);
      res.json({
        success: true,
        accessToken,
        refreshToken,
        userExists: req.userExists,
        message: "Authentication successful",
      });
    } else {
      const { phoneNumber, currentStep } = req.body;
      const sessionToken = await generateSessionToken(phoneNumber, currentStep);
      res.status(200).json({
        success: true,
        message: "Session token generated successfully",
        sessionToken,
      });
    }
  } catch (error) {
    next(error instanceof Error ? error : new InternalServerError());
  }
};

import { sendOTP, verifyOTP } from "../services/otpServices.js";
import { NextFunction, Request, Response } from "express";
import {
  ExternalServiceError,
  ValidationError,
} from "../../utils/ErrorClasses.js";

export const SendOTPToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber } = req.body;
    await sendOTP(phoneNumber);
    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending OTP to user:", error);
    next(new ExternalServiceError(`Failed to send OTP: ${error.message}`));
  }
};

declare global {
  namespace Express {
    interface Request {
      isVerified?: boolean;
    }
  }
}
export const VerifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isVerified = await verifyOTP(phoneNumber, otp);
    if (isVerified) {
      req.isVerified = true;
      next();
    } else {
      throw new ValidationError("Invalid OTP");
    }
  } catch (error: any) {
    if (error instanceof ValidationError) {
      next(new ValidationError(error.message));
    } else {
      next(new ExternalServiceError(`Failed to verify OTP: ${error.message}`));
    }
  }
};

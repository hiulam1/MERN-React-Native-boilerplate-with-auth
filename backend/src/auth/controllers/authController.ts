import { sendOTP, verifyOTP } from "../utils/twilio.js";
import { NextFunction, Request, Response } from "express";

export const SendOTPToUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const response = await sendOTP(phoneNumber);
    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP to user:", error);
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
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

import { sendOTP, verifyOTP } from "../services/twilio.js";
import { Request, Response } from "express";

export const SendOTPToUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const response = await sendOTP(phoneNumber);
    res.status(200).json({
      message: "OTP sent successfully",
      response,
    });
  } catch (error) {
    console.error("Error sending OTP to user:", error);
  }
};

export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isVerified = await verifyOTP(phoneNumber, otp);
    if (isVerified) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

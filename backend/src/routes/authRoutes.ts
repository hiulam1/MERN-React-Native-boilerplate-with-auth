import express from "express";
import { SendOTPToUser, VerifyOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", SendOTPToUser);
router.post("/verify-otp", VerifyOTP);

export default router;

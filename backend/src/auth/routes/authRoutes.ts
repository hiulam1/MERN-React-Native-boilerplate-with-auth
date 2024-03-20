import express from "express";
import { SendOTPToUser, VerifyOTP } from "../controllers/authController.js";
import { cacheNumber } from "../middlewares/cachingNumber.js";
import { checkUserExistence } from "../middlewares/checkUserExistence.js";
import { generateToken } from "../middlewares/generateJWT.js";
import { refreshToken } from "../controllers/tokenController.js";
const router = express.Router();

router.post("/send-otp", SendOTPToUser);
router.post(
  "/verify-otp",
  VerifyOTP,
  checkUserExistence,
  cacheNumber,
  generateToken
);
router.post("/refresh-token", refreshToken);
export default router;

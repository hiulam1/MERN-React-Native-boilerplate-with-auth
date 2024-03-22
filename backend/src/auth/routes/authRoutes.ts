import express, { Request, Response } from "express";
import { SendOTPToUser, VerifyOTP } from "../controllers/authController.js";
import { generateSessionToken } from "../middlewares/generateSessionToken.js";
import { checkUserExistence } from "../middlewares/checkUserExistence.js";
import { generateTokens } from "../middlewares/generateJWT.js";
import { refreshToken } from "../controllers/tokenController.js";
// import { logout } from "../controllers/logoutController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import logoutController from "../controllers/logoutController.js";
import { checkTokenBlacklist } from "../middlewares/checkTokenBlacklist.js";
const router = express.Router();

router.post("/send-otp", SendOTPToUser);
router.post(
  "/verify-otp",
  VerifyOTP,
  checkUserExistence,
  generateSessionToken, // if user does not exist, generate session token to complete registration
  generateTokens // if user exists, generate JWT tokens
);
router.post("/refresh-token", refreshToken);
router.post("/logout", checkTokenBlacklist, logoutController);
router.get(
  "/verify",
  verifyAccessToken,
  checkTokenBlacklist,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Token verified" });
  }
);
export default router;

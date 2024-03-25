import express, { Request, Response } from "express";
import { authMiddlewares } from "../middlewares/index.js";
import { SendOTPToUser, VerifyOTP } from "../controllers/otpController.js";
import { logout, refreshToken } from "../controllers/sessionController.js";
import { catchErrors } from "../../utils/catchErrors.js";
const router = express.Router();

router.post("/send-otp", SendOTPToUser);
router.post(
  "/verify-otp",
  catchErrors(VerifyOTP),
  catchErrors(authMiddlewares.checkUserExistence), // if user exists then generate tokens
  catchErrors(authMiddlewares.tokenGeneration) // if user does not exist, generate session token to complete registration
);
router.post("/refresh-token", catchErrors(refreshToken));
router.post(
  "/logout",
  catchErrors(authMiddlewares.checkTokenBlacklist),
  catchErrors(logout)
);
router.get(
  "/verify",
  catchErrors(authMiddlewares.verifyAccessToken),
  catchErrors(authMiddlewares.checkTokenBlacklist),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Token verified" });
  }
);
export default router;

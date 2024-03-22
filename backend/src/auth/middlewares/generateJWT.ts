import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

export const generateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n")!;
  if (!req.userExists) {
    return next();
  }
  if (!privateKey) {
    console.error("Private Key is not defined.");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const accessToken = jwt.sign(
      { id: req.userExists._id, email: req.userExists.email },
      privateKey,
      {
        expiresIn: "1h",
        algorithm: "RS256",
      }
    );
    console.log("Access Token: ", accessToken);
    const refreshToken = jwt.sign(
      { id: req.userExists._id, email: req.userExists.email },
      privateKey,
      {
        expiresIn: "7d",
        algorithm: "RS256",
      }
    );
    res.json({
      userExists: req.userExists,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "authentication successful",
    });
    console.log("response sent");
  } catch (error) {
    console.error("Error generating token: ", error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

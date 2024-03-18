import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

export const generateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  if (!req.userExists) {
    return next();
  }
  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    console.error("JWT_SECRET is not defined.");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const accessToken = jwt.sign({ id: req.userExists._id }, JWT_SECRET, {
      expiresIn: "1h",
      algorithm: "RS256",
    });
    const refreshToken = jwt.sign(
      { id: req.userExists._id },
      JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "authentication successful",
    });
  } catch (error) {
    console.error("Error generating token: ", error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

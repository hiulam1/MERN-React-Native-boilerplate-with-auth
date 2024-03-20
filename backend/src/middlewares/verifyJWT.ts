import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import extractTokenFromHeader from "@/users/utils/extractAccessToken.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractTokenFromHeader(req);

  if (!accessToken) {
    return res
      .status(403)
      .json({ message: "An access token is required for authentication" });
  }

  try {
    const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n")!;

    const decoded = jwt.verify(accessToken, publicKey!, {
      algorithms: ["RS256"],
    });
    req.userExists = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

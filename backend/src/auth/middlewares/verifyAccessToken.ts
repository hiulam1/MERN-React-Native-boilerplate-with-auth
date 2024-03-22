import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import extractTokenFromHeader from "../utils/extractAccessToken.js";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractTokenFromHeader(req);

  if (!accessToken) {
    console.log("no access token");
    return res.status(403).json({ message: "No access token in header" });
  }

  try {
    const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n")!;

    const decoded = jwt.verify(accessToken, publicKey!, {
      algorithms: ["RS256"],
    });
    req.userExists = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("token expired");
      return res.status(401).json({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("invalid tokens" + error);
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Error verifying token: ", error);
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
  }
};

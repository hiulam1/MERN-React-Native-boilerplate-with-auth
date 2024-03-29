import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { extractAccessToken, verifyToken } from "../services/authServices.js";
import { AuthenticationError } from "../../utils/ErrorClasses.js";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = extractAccessToken(req);

  if (!accessToken) {
    return next(new AuthenticationError("No access token in header"));
  }

  try {
    const decoded = await verifyToken(accessToken);
    req.userExists = decoded.id;
    next();
  } catch (error) {
    next(new AuthenticationError("Failed to authenticate access token"));
  }
};

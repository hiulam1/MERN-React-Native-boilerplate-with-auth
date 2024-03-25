import User from "../../users/models/User.js";
import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../utils/ErrorClasses.js";

declare global {
  namespace Express {
    interface Request {
      userExists?: string;
    }
  }
}
export const checkUserExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { phoneNumber } = req.body;
  try {
    const userFound = await User.findOne({ phoneNumber: phoneNumber }).exec();
    if (userFound) {
      req.userExists = userFound._id.toString();
      console.log("User found: ", userFound);
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    next(new InternalServerError("Failed to check user existence"));
  }
};

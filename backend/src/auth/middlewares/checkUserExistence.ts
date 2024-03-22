import User from "../../users/models/User.js";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userExists?: any;
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
    req.userExists = userFound ? userFound : null;
    console.log("User found: ", userFound);
    next();
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({ message: "Failed to check user existence" });
  }
};

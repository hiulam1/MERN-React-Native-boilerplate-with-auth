import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import "dotenv/config";

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh Token is required" });

  try {
    const decoded = jwt.verify(
      refreshToken as string,
      process.env.JWT_REFRESH_SECRET!
    );
    const userID = (decoded as any).id;
    const newAccessToken = jwt.sign({ id: userID }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
      algorithm: "RS256",
    });
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token: ", error);
    res.status(403).json({ message: "Failed to refresh token" });
  }
};

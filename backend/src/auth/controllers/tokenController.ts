import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import "dotenv/config";

export const refreshToken = async (req: Request, res: Response) => {
  const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n")!;
  const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n")!;

  const refreshToken = req.headers["x-refresh-token"] as string | undefined;
  if (!refreshToken) {
    console.log("no refresh token");
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken as string, publicKey, {
      algorithms: ["RS256"],
    });
    const userID = (decoded as any).id;
    const newAccessToken = jwt.sign({ id: userID }, privateKey, {
      expiresIn: "1h",
      algorithm: "RS256",
    });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("refresh token expired");
      return res.status(401).json({ message: "Refresh token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("invalid refresh token");

      return res.status(401).json({ message: "Invalid refresh token" });
    } else {
      console.error("Error refreshing token: ", error);

      return res.status(500).json({ message: "Failed to refresh token" });
    }
  }
};

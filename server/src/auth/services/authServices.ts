import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { Request } from "express";
import redisClient from "../../services/redis.js";
import { randomBytes } from "crypto";

const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n")!;
const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n")!;

export const extractAccessToken = (req: Request): string | null => {
  const authHeader = req.headers["authorization"] || "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7, authHeader.length);
  } else {
    return null;
  }
};

export const extractRefreshToken = (req: Request): string | null => {
  return req.headers["x-refresh-token"] as string;
};

export const generateAccessToken = (userID: string) => {
  return jwt.sign({ id: userID }, privateKey, {
    expiresIn: "1h",
    algorithm: "RS256",
  });
};

export const generateRefreshToken = (userID: string) => {
  return jwt.sign({ id: userID }, privateKey, {
    expiresIn: "7d",
    algorithm: "RS256",
  });
};

export const generateSessionToken = async (
  phoneNumber: number,
  currentStep: number
) => {
  const sessionToken = randomBytes(48).toString("hex");
  await redisClient.set(
    `session:${sessionToken}`,
    JSON.stringify({
      phoneNumber: phoneNumber,
      sessionToken: sessionToken,
      currentStep: currentStep,
    }),
    {
      EX: 86400,
    }
  );
};

export const deleteSessionToken = async (
  sessionToken: string
): Promise<boolean> => {
  const result = await redisClient.del(`session:${sessionToken}`);
  return result > 0;
};

export const verifySessionToken = async (sessionToken: string) => {
  return await redisClient.get(`session:${sessionToken}`);
};

export const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
};

export const blacklistToken = async (token: string, ttl: number) => {
  await redisClient.set(`blacklist:${token}`, "true", { EX: ttl });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as JwtPayload | null;
};

export const isTokenBlacklisted = async (
  token: string | null
): Promise<boolean> => {
  if (!token) return false;
  const tokenBlacklisted = await redisClient.get(`blacklist:${token}`);
  return !!tokenBlacklisted;
};

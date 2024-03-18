import mongoose from "mongoose";
import User from "../../models/User.js";
import { Request, Response } from "express";
import redisClient from "../../services/redis.js";

export const create = async (req: Request, res: Response) => {
  const { email, role = "user" } = req.body as {
    email: string;
    role?: string;
  };
  const sessionId = req.headers["session-id"] || req.body.sessionId;
  if (!email || !sessionId) {
    return res.status(400).json({
      success: false,
      message: "Email or session ID not valid.",
    });
  }
  try {
    const sessionData = await redisClient.get(`session:${sessionId}`);
    if (!sessionData) {
      return res.status(400).json({
        success: false,
        message: "Session expired or invalid.",
      });
    }
    const { phoneNumber } = JSON.parse(sessionData);
    const user = new User({
      email,
      phoneNumber,
      role,
    });
    const savedUser = await user.save();
    await redisClient.del(`session:${sessionId}`);
    res.status(201).json({
      success: true,
      result: savedUser,
      message: "User created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      result: null,
      message: "An error occurred while creating the user.",
    });
  }
};

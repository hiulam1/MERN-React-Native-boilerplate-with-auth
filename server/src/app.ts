import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./auth/routes/authRoutes.js";
import { limiter } from "./middlewares/rateLimiting.js";
import userRoutes from "./users/routes/userRoutes.js";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express";

import "dotenv/config";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ValidationError } from "./utils/ErrorClasses.js";

const app = express();

app.use(helmet());
app.use(cors()); // to change before deployment
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test-error", (req, res, next) => {
  try {
    throw new ValidationError("Test Error");
  } catch (error) {
    next(error);
  }
});
app.use("/api/", limiter);
app.use("/api/auth", authRoutes);
app.use("/", userRoutes);
app.use(errorHandler);

export default app;

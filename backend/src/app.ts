import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./auth/routes/authRoutes.js";
import { limiter } from "./middlewares/rateLimiting.js";
import userRoutes from "./users/routes/userRoutes.js";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express";

import "dotenv/config";

const app = express();

app.use(helmet());
app.use(cors()); // to change before deployment
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", limiter);
app.use("/api/auth", authRoutes);
app.use("/", userRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
export default app;

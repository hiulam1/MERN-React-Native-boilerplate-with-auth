import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config/auth.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // to change before deployment
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

export default app;

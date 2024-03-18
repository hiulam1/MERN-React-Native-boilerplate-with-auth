import express from "express";
import { create } from "../controllers/userController/Create.js";
import { generateToken } from "../middlewares/generateJWT.js";

const router = express.Router();

router.post("/register", create, generateToken);

export default router;

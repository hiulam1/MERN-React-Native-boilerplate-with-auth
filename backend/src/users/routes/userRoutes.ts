import express from "express";
import { create } from "../controllers/Create.js";
import { generateToken } from "../../auth/middlewares/generateJWT.js";

const router = express.Router();

router.post("/register", create, generateToken);

export default router;

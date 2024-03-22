import express from "express";
import { create } from "../controllers/Create.js";
import { generateTokens } from "../../auth/middlewares/generateJWT.js";
import { verifyClientSession } from "../../auth/middlewares/verifyClientSession.js";
const router = express.Router();

router.post("/register", verifyClientSession, create, generateTokens);

export default router;

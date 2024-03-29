import express from "express";
import { create } from "../controllers/Create.js";
import { verifyClientSession } from "../../auth/middlewares/verifyClientSession.js";
import { tokenGeneration } from "../../auth/middlewares/tokenGeneration.js";
const router = express.Router();

router.post("/register", verifyClientSession, create, tokenGeneration);

export default router;

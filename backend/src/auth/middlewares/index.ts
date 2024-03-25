import { checkTokenBlacklist } from "./checkTokenBlacklist.js";
import { verifyAccessToken } from "./verifyAccessToken.js";
import { verifyClientSession } from "./verifyClientSession.js";
import { checkUserExistence } from "./checkUserExistence.js";
import { tokenGeneration } from "./tokenGeneration.js";

export const authMiddlewares = {
  checkTokenBlacklist,
  verifyAccessToken,
  verifyClientSession,
  checkUserExistence,
  tokenGeneration,
};

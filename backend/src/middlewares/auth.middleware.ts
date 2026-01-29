import type { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";
import type { AuthJwtPayload, AuthRequest } from "../types/controllers/index.ts";

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.unauthorized(ERROR_MESSAGES.ACCESS_TOKEN_MISSING);
  }
  
  try {
    const data = verifyAccessToken(accessToken) as AuthJwtPayload;
    console.log("Protect middleware - verified token data:", data);
    req.user = data;
    next();
  } catch {
    return res.unauthorized(ERROR_MESSAGES.ACCESS_TOKEN_INVALID);
  }
};

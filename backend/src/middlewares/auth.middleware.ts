import type { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.unauthorized(ERROR_MESSAGES.ACCESS_TOKEN_MISSING);
  }
  
  try {
    verifyAccessToken(accessToken);
    next();
  } catch {
    return res.unauthorized(ERROR_MESSAGES.ACCESS_TOKEN_INVALID);
  }
};

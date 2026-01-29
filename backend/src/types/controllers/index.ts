import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  username: string;
  token: string;
}

export interface AuthRequest extends Request {
  user?: AuthJwtPayload;
  validateData: any;
  allParams: Record<string, any>;
}

// export interface AccessTokenPayload {
//   sub: string;
// }

// export interface RefreshTokenPayload {
//   userId: string;
//   refreshTokenId: string;
// }

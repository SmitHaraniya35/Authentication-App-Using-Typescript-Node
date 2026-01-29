import type { Request, Response } from "express";
import { loginService, signupService, refreshService, logoutService } from "../services/auth.service.ts";
import type { ISignUp } from "../types/controllers/ISignUp.ts";
import type { ILogin } from "../types/controllers/ILogin.ts";
import { verifyRefreshToken } from "../utils/jwt.utils.ts"; 
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts";
import type { AuthJwtPayload, AuthRequest } from "../types/controllers/index.ts";

export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { username , email, password } = req.validateData as ISignUp;
    const { user } = await signupService(username, email, password);

    res.created(user, SUCCESS_MESSAGES.USER_CREATED);
  } catch (error: any) {
    res.badRequest(error.message);
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.allParams as ILogin;
    const { user , accessToken, refreshToken } = await loginService(email, password);

    // res.cookie('accessToken', accessToken, {
    //   maxAge: 24*60*60*1000,
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true
    // });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 24*60*60*1000,
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    const data = {
      userId: user.id,
      email: user.email,
      username: user.username,
      token: accessToken
    } as AuthJwtPayload;

    res.ok(data, SUCCESS_MESSAGES.LOGIN_SUCCESS);
  } catch (error: any) {
    res.badRequest(error.message);
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if(!userId){
      return res.unauthorized(ERROR_MESSAGES.USER_NOT_EXIST);
    }

    await logoutService(userId);
    
    res.clearCookie('refreshToken', { 
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    res.ok(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  } catch (error: any) {
    res.badRequest(error.message);
  }
};

export const refresh = async (req: AuthRequest, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.unauthorized(ERROR_MESSAGES.REFRESH_TOKEN_MISSING);
    }

    const {userId, refreshTokenId } = verifyRefreshToken(refreshToken)
    
    if(!userId && !refreshTokenId){
        return res.unauthorized(ERROR_MESSAGES.REFRESH_TOKEN_INVALID);
    }

    const { accessToken } = await refreshService(userId, refreshTokenId);

    // res.cookie('accessToken', accessToken, {  
    //   maxAge: 24*60*60*1000,
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true
    // });

    res.ok({ token: accessToken}, SUCCESS_MESSAGES.ACCESS_TOKEN_SUCCESS);
  } catch (error: any) {
    res.badRequest(error.message);
  }
}

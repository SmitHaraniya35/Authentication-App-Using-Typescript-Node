import type { Request, Response } from "express";
import { loginService, signupService, refreshService } from "../services/auth.service.ts";
import type { ISignUp } from "../types/controllers/ISignUp.ts";
import type { ILogin } from "../types/controllers/ILogin.ts";
import { verifyRefreshToken } from "../utils/jwt.utils.ts"; 
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts";
import type { IUserId } from "../types/controllers/IUserId.ts";
import { deleteUserByIdService } from "../services/user.service.ts";


export const signup = async (req: Request, res: Response) => {
  try {
    const { username , email, password } = req.validateData as ISignUp;
    const { user, accessToken, refreshToken } = await signupService(username, email, password);

    res.cookie('accessToken', accessToken, {
      maxAge: 1*60*1000,
      httpOnly: true,
      sameSite: true
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 5*60*1000,
      httpOnly: true,
      sameSite: true
    });

    res.created(user, SUCCESS_MESSAGES.USER_CREATED);
  } catch (error: any) {
    res.badRequest(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.allParams as ILogin;
    const { user, accessToken, refreshToken } = await loginService(email, password);

    res.cookie('accessToken', accessToken, {
      maxAge: 1*60*1000,
      httpOnly: true,
      sameSite: true
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 5*60*1000,
      httpOnly: true,
      sameSite: true
    });

    res.ok(user, SUCCESS_MESSAGES.LOGIN_SUCCESS);
  } catch (error: any) {
    res.badRequest(error.message);
  }
};

export const refresh = async (req: Request, res: Response) => {
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

    res.cookie('accessToken', accessToken, {  
      maxAge: 1*60*1000,
      httpOnly: true,
      sameSite: true
    });

    res.ok(SUCCESS_MESSAGES.ACCESS_TOKEN_SUCCESS);
  } catch (error: any) {
    res.badRequest(error.message);
  }
}



import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts";
import { deleteUserByIdService, getAllUsersService, getMeService } from "../services/user.service.ts"
import type { Response } from "express";
import type { AuthJwtPayload, AuthRequest } from "../types/controllers/index.ts";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    console.log("getMe - req.user:", req.user);
    const user: AuthJwtPayload | undefined = req.user;
    
    if(!user){
      return  res.unauthorized(ERROR_MESSAGES.USER_NOT_EXIST);
    }

    const data = await getMeService(user.userId);
    console.log("getMe data:", data);

    return res.ok(data, SUCCESS_MESSAGES.USER_FETCHED);

  } catch(error: any) {
    res.badRequest(error.message);
  }  
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const userList = await getAllUsersService();
        res.ok(userList, SUCCESS_MESSAGES.USERS_DATA_FETCHED_SUCCESS);
    } catch (error: any){
        res.badRequest(error.message);
    }
}

export const deleteUserById = async (req: AuthRequest, res: Response) => {
  try{
    const userId: string | undefined = req.user?.userId;
    
    if(!userId){
      return res.notFound(ERROR_MESSAGES.USER_ID_MISSING);
    }

    const result = await deleteUserByIdService(userId);

    return res.ok(result);
  } catch (error: any) {
    res.badRequest(error.message);
  }
}
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants.ts";
import { deleteUserByIdService, getAllUsersService } from "../services/user.service.ts"
import type { Request, Response } from "express";
import type { IUserId } from "../types/controllers/IUserId.ts";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userList = await getAllUsersService();
        res.ok(userList, SUCCESS_MESSAGES.USERS_DATA_FETCHED_SUCCESS);
    } catch (error: any){
        res.badRequest(error.message);
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
  try{
    const { userId } = req.allParams as IUserId;
    
    if(!userId){
      return res.notFound(ERROR_MESSAGES.USER_ID_MISSING);
    }

    const result = await deleteUserByIdService(userId);

    return res.ok(result);
  } catch (error: any) {
    res.badRequest(error.message);
  }
}
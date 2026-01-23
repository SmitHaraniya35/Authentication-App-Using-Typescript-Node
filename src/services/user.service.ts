import { ERROR_MESSAGES } from "../constants.ts";
import { User } from "../models/user.model.ts";
import type { UserDocument, UserModel } from "../types/models/user.document.ts";

export const getAllUsersService = async () => {
    const data = await User.findActive();
    
    if(data.length === 0){
        throw new Error(ERROR_MESSAGES.USERS_NOT_FOUND);
    }

    return { data };
}

export const deleteUserByIdService = async (userId: string) => {
    // const user: UserDocument | null = await User.findOne({id: userId});
    
    // if(!user){
    //     throw new Error(ERROR_MESSAGES.INVALID_USER_ID);
    // }

    // if(user.isDeleted){
    //     throw new Error("User already deleted")
    // }

    const user: UserDocument | null = await User.findByIdActive(userId);

    if(!user){
        throw new Error(ERROR_MESSAGES.INVALID_USER_ID);
    }

    await User.softDelete({ id: userId });
    return { user };
}
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.ts";
import { generateAccessToken, generateRefreshToken, generateRefreshTokenId } from "../utils/jwt.utils.ts";
import { ERROR_MESSAGES } from "../constants.ts";
import type { UserDocument } from "../types/models/user.document.ts";

export const signupService = async (username: string, email: string, password: string) => {
    const userExists: UserDocument | null = await User.findOne({ email });
    if (userExists){
        throw new Error(ERROR_MESSAGES.USER_EXIST);
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: UserDocument = await User.create({
        username,
        email,
        password: hashedPassword,
        refreshTokenId: ""
    });

    user.save();

    return { user };
};

export const loginService = async (email: string, password: string) => {
    const user: UserDocument | null = await User.findOneActive({ email });
    if (!user){
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken: string = generateAccessToken(user.id, user.email);
    const hashedRefreshTokenId: string = await generateRefreshTokenId();

    user.refreshTokenId = hashedRefreshTokenId; // hashed refreshTokenId using uuid()
    await user.save();
    const refreshToken: string = generateRefreshToken(user.id, hashedRefreshTokenId);

    return { user, accessToken, refreshToken };
};

export const refreshService = async (userId: string, refreshTokenId: string) => {
    const user = await User.findOneActive({id: userId});

    if(!user){
      throw new Error(ERROR_MESSAGES.USER_NOT_EXIST);
    }

    if(user.refreshTokenId !== refreshTokenId){
        throw new Error(ERROR_MESSAGES.REFRESH_TOKEN_INVALID); 
    }

    const accessToken: string = generateAccessToken(user.id, user.email);

    return { accessToken };
}

export const logoutService = async (userId: string) => {
    const user = await User.findOneActive({id: userId});

    if(!user){
      throw new Error(ERROR_MESSAGES.USER_NOT_EXIST);
    }

    user.refreshTokenId = "";
    await user.save();
    return;
}
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

    const accessToken: string = generateAccessToken(user._id.toString());
    const hashedRefreshTokenId = await generateRefreshTokenId();

    user.refreshTokenId = hashedRefreshTokenId; // hashed refreshTokenId using uuid()
    user.save();
    const refreshToken = generateRefreshToken(user._id.toString(), hashedRefreshTokenId);

    return { user, accessToken, refreshToken }
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user){
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken: string = generateAccessToken(user._id.toString());
    const hashedRefreshTokenId = await generateRefreshTokenId();

    user.refreshTokenId = hashedRefreshTokenId; // hashed refreshTokenId using uuid()
    await user.save();
    const refreshToken: string = generateRefreshToken(user._id.toString(), hashedRefreshTokenId);

    return { user, accessToken, refreshToken };
};

export const refreshService = async (userId: string, refreshTokenId: string) => {
    const user = await User.findOne({_id: userId});

    if(!user){
      throw new Error(ERROR_MESSAGES.USER_NOT_EXIST);
    }

    if(user.refreshTokenId !== refreshTokenId){
        throw new Error(ERROR_MESSAGES.REFRESH_TOKEN_INVALID); 
    }

    const accessToken: string = generateAccessToken(user._id.toString());

    return { accessToken };
}
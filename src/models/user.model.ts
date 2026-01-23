import type { UserDocument, UserModel } from "../types/models/user.document.ts";
import { model } from 'mongoose';
import { generateSchema } from '../types/index.ts';
import { BaseClass } from "../types/base.class.ts";

const UserSchema = generateSchema<UserDocument>({
    username: { type: String},
    email: { type: String },
    password: { type: String },
    refreshTokenId: { type: String },
});

export class UserClass extends BaseClass<UserDocument> {}

// Load all BaseClass + UserClass methods
UserSchema.loadClass(UserClass);

export const User = model<UserDocument, UserModel>('User', UserSchema);

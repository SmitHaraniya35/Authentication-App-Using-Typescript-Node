import type { BaseModel } from "./base.model.ts"
import type { BaseDocument } from "../base.document.ts"

export interface UserDocument extends BaseDocument{
    username: string,
    email: string,
    password: string,
    refreshTokenId: string
}

export interface UserModel extends BaseModel<UserDocument> {}




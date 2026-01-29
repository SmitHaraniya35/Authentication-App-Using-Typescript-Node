import { Document } from "mongoose";

export interface BaseDocument extends Document{
    id: string,
    createdAt? : Date,
    updatedAt? : Date,
    isDeleted? : Boolean,
    deletedAt? : Date
}
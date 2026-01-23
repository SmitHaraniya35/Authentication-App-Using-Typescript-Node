import mongoose, { Document } from "mongoose";

export interface BaseDocument extends Document{
    id: String,
    createdAt? : Date,
    updatedAt? : Date,
    isDeleted? : Boolean,
    deletedAt? : Date
}
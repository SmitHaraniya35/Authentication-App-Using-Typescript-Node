import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constants.ts";

export const connectDB = async (): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err)
        console.error(ERROR_MESSAGES.MONGO_CONNECTION_ERR);
        process.exit(1);
    }
};
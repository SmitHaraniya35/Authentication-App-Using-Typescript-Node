import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.ts"
import { responseMiddleware } from "./middlewares/response.middleware.ts";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes.ts";

const app = express();

app.use(responseMiddleware);
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;

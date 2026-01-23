import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.ts"
import { responseMiddleware } from "./middlewares/response.middleware.ts";
import morgan from "morgan";

const app = express();

app.use(responseMiddleware);
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    res.send("Helllo!!!")
})

app.use("/api/auth", authRoutes);

export default app;
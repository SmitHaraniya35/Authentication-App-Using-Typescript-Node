import app from "./app.ts";
import { connectDB } from "./database/db.ts";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}/`);
});


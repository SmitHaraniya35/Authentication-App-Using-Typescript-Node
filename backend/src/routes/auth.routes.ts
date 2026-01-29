import { Router } from "express";
import * as authController from "../controllers/auth.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requestValidation } from "../validators/requestValidation.ts";
import { loginSchema, signupSchema } from "../validators/auth.validator.ts";

const router = Router();

router.post("/signup", requestValidation(signupSchema), authController.signup);
router.post("/login", requestValidation(loginSchema), authController.login);
router.get("/logout", protect, authController.logout);
router.get("/refresh-token", authController.refresh);


export default router;

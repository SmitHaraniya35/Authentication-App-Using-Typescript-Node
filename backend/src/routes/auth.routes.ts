import { Router } from "express";
import * as authController from "../controllers/auth.controller.ts";
import * as userController from "../controllers/user.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requestValidation } from "../validators/requestValidation.ts";
import { loginSchema, signupSchema, userIdSchema } from "../validators/auth.validator.ts";

const router = Router();

router.post("/signup", requestValidation(signupSchema), authController.signup);
router.post("/login", requestValidation(loginSchema), authController.login);
router.get("/refresh-token", authController.refresh);

router.get("/get-all-users", protect, userController.getAllUsers);
router.delete("/delete-user", requestValidation(userIdSchema), userController.deleteUserById);

export default router;

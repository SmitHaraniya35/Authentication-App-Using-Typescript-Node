import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as userController from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { requestValidation } from "../validators/requestValidation.js";
import { loginSchema, signupSchema, userIdSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", requestValidation(signupSchema), authController.signup);
router.post("/login", requestValidation(loginSchema), authController.login);
router.get("/refresh-token", authController.refresh);

router.get("/get-all-users", protect, userController.getAllUsers);
router.delete("/delete-user", requestValidation(userIdSchema), userController.deleteUserById);

export default router;

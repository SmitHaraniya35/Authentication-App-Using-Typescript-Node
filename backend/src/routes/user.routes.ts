import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import * as userController from "../controllers/user.controller.ts";

const router = Router();

router.get("/me", protect, userController.getMe);
router.get("/get-all-users", protect, userController.getAllUsers);
router.delete("/delete-user", protect, userController.deleteUserById);

export default router;
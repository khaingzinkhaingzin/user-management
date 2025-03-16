import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation.middleware";

const router = Router();

router.post("/register", validateRegister, UserController.register);
router.post("/login", validateLogin, UserController.login);
router.get("/users", authMiddleware, UserController.getUsers);

export const userRouter = router;

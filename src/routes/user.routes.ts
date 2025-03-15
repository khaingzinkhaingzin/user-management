import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation.middleware";

const router = Router();

router.post("/register", validateRegister, UserController.register);
router.post("/login", validateLogin, UserController.login);

export const userRouter = router;

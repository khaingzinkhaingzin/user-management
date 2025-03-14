import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/register", UserController.register);

export const userRouter = router;

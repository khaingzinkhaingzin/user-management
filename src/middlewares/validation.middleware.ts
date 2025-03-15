import { Request, Response, NextFunction } from "express";
import {
  registerValidator,
  loginValidator,
} from "../validators/user.validator";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = registerValidator.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

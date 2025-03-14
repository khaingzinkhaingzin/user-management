import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { registerValidator } from "../validators/user.validator";

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { error } = registerValidator.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { name, email, password } = req.body;
      const existingUser = await UserService.getUserByEmail(email);

      if (existingUser) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      const user = await UserService.createUser(name, email, password);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }
}

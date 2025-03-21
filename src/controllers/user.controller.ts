import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
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

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(404).json({ message: "Password is incorrect" });
        return;
      }

      // Generate JWT token (you can expand this logic later)
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  }
}

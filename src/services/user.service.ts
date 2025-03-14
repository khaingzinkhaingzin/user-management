import prisma from "../prisma/client";
import bcrypt from "bcryptjs";

export class UserService {
  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, "mySa1t");
    return prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }
}

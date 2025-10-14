import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const TOKEN_EXPIRES_IN = "7d";

type Role = "user" | "admin";

export interface RegisterInput {
  role: Role;
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  role: Role;
  email: string;
  password: string;
}

class AuthService {
  async register(input: RegisterInput) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    if (input.role === "user") {
      const created = await prisma.user.create({ data: { name: input.name, email: input.email, passwordHash } });
      return created;
    }
    const created = await prisma.admin.create({ data: { name: input.name, email: input.email, passwordHash } });
    return created;
  }

  async login(input: LoginInput) {
    const repo = input.role === "user" ? prisma.user : prisma.admin;
    const actor = await repo.findUnique({ where: { email: input.email } });
    if (!actor) throw new Error("Credenciais inválidas");
    const ok = await bcrypt.compare(input.password, (actor as any).passwordHash);
    if (!ok) throw new Error("Credenciais inválidas");
    const token = jwt.sign({ sub: actor.id, role: input.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    return { token, role: input.role, id: actor.id, name: (actor as any).name, email: (actor as any).email };
  }
}

export default new AuthService();




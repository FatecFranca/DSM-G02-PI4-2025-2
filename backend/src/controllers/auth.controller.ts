import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { handleError } from "../utils/errorHandler";
import { loginSchema, registerSchema } from "../validations/auth.validation";

class AuthController {
  async register(req: Request, res: Response) {
    const { error } = registerSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const created = await AuthService.register(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao cadastrar.");
    }
  }

  async login(req: Request, res: Response) {
    const { error } = loginSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const result = await AuthService.login(req.body);
      return res.json(result);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao autenticar.", 401);
    }
  }
}

export default new AuthController();



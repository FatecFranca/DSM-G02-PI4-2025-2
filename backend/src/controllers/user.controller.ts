import { Request, Response } from "express";
import UserService from "../services/user.service";
import { handleError } from "../utils/errorHandler";
import { createUserSchema, updateUserSchema } from "../validations/user.validation";

class UserController {
  async create(req: Request, res: Response) {
    const { error } = createUserSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao criar usuário.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
      const list = await UserService.list(page, pageSize);
      return res.json(list);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao listar usuários.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const item = await UserService.getById(req.params.id);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Usuário não encontrado", 404);
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateUserSchema.validate({ ...req.body, id: req.params.id });
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const item = await UserService.update(req.params.id, req.body);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao atualizar usuário.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const item = await UserService.delete(req.params.id);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao deletar usuário.");
    }
  }
}

export default new UserController();




import { Request, Response } from "express";
import AdminService from "../services/admin.service";
import { handleError } from "../utils/errorHandler";
import { createAdminSchema, updateAdminSchema } from "../validations/admin.validation";

class AdminController {
  async create(req: Request, res: Response) {
    const { error } = createAdminSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const admin = await AdminService.create(req.body);
      return res.status(201).json(admin);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao criar administrador.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
      const list = await AdminService.list(page, pageSize);
      return res.json(list);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao listar administradores.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const item = await AdminService.getById(req.params.id);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Administrador não encontrado", 404);
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateAdminSchema.validate({ ...req.body, id: req.params.id });
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const item = await AdminService.update(req.params.id, req.body);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao atualizar administrador.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const item = await AdminService.delete(req.params.id);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao deletar administrador.");
    }
  }
}

export default new AdminController();



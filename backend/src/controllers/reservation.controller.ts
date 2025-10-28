import { Request, Response } from "express";
import ReservationService from "../services/reservation.service";
import { handleError } from "../utils/errorHandler";
import { createReservationSchema, cancelReservationSchema } from "../validations/reservation.validation";

class ReservationController {
  async create(req: Request, res: Response) {
    const { error } = createReservationSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const reservation = await ReservationService.create({ ...req.body, userId: req.user!.id });
      return res.status(201).json(reservation);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao criar reserva.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const list = await ReservationService.list({ parkingSlotId: req.query.parkingSlotId as string | undefined });
      return res.json(list);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao listar reservas.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const item = await ReservationService.getById(req.params.id);
      return res.json(item);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao carregar reserva.", 404);
    }
  }

  async listMine(req: Request, res: Response) {
    try {
      const list = await ReservationService.listByUser(req.user!.id);
      return res.json(list);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao listar reservas do usuário.");
    }
  }

  async update(req: Request, res: Response) {
    const { error } = createReservationSchema.validate(req.body);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const reservation = await ReservationService.update(req.params.id, { ...req.body, userId: req.user!.id });
      return res.json(reservation);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao atualizar reserva.");
    }
  }

  async cancel(req: Request, res: Response) {
    const { error } = cancelReservationSchema.validate(req.params);
    if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    try {
      const result = await ReservationService.cancel(req.params.id, req.user!.id);
      return res.json(result);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao cancelar reserva.");
    }
  }
}

export default new ReservationController();



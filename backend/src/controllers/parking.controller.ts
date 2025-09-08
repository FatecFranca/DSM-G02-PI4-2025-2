import { Request, Response } from "express";
import ParkingService from "../services/parking.service";
import { createParkingSchema, updateParkingSchema } from "../validations/parking.validation";
import { handleError } from "../utils/errorHandler";

class ParkingController {
    async create(req: Request, res: Response) {
        const { error } = createParkingSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const parking = await ParkingService.createParking(req.body);
            return res.status(201).json(parking);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar o estacionamento.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkings = await ParkingService.getParkings(page, pageSize);
            return res.json(parkings);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os estacionamentos.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const parking = await ParkingService.getParkingById(req.params.id);
            if (!parking) return handleError(res, new Error("Estacionamento não encontrado."), "Estacionamento não encontrado.", 404);

            return res.json(parking);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar o estacionamento.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateParkingSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedParking = await ParkingService.updateParking(req.params.id, req.body);
            return res.json(updatedParking);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar o estacionamento.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await ParkingService.deleteParking(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar o estacionamento.", 400);
        }
    }

    async getActive(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkings = await ParkingService.getActiveParkings(page, pageSize);
            return res.json(parkings);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os estacionamentos ativos.", 400);
        }
    }
}

export default new ParkingController();

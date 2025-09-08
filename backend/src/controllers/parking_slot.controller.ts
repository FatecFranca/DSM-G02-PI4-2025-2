import { Request, Response } from "express";
import ParkingSlotService from "../services/parking_slot.service";
import { createParkingSlotSchema, updateParkingSlotSchema } from "../validations/parking_slot.validation";
import { handleError } from "../utils/errorHandler";

class ParkingSlotController {
    async create(req: Request, res: Response) {
        const { error } = createParkingSlotSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const parkingSlot = await ParkingSlotService.createParkingSlot(req.body);
            return res.status(201).json(parkingSlot);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar a vaga de estacionamento.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSlots = await ParkingSlotService.getParkingSlots(page, pageSize);
            return res.json(parkingSlots);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar as vagas de estacionamento.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const parkingSlot = await ParkingSlotService.getParkingSlotById(req.params.id);
            if (!parkingSlot) return handleError(res, new Error("Vaga de estacionamento não encontrada."), "Vaga de estacionamento não encontrada.", 404);

            return res.json(parkingSlot);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar a vaga de estacionamento.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateParkingSlotSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedParkingSlot = await ParkingSlotService.updateParkingSlot(req.params.id, req.body);
            return res.json(updatedParkingSlot);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar a vaga de estacionamento.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await ParkingSlotService.deleteParkingSlot(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar a vaga de estacionamento.", 400);
        }
    }

    async getByParkingId(req: Request, res: Response) {
        try {
            const parkingId = req.params.parkingId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSlots = await ParkingSlotService.getParkingSlotsByParkingId(parkingId, page, pageSize);
            return res.json(parkingSlots);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar as vagas do estacionamento.", 400);
        }
    }

    async getAvailable(req: Request, res: Response) {
        try {
            const parkingId = req.query.parkingId as string;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSlots = await ParkingSlotService.getAvailableParkingSlots(parkingId, page, pageSize);
            return res.json(parkingSlots);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar as vagas disponíveis.", 400);
        }
    }
}

export default new ParkingSlotController();

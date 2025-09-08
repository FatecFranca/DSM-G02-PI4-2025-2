import { Request, Response } from "express";
import ParkingSensorService from "../services/parking_sensor.service";
import { createParkingSensorSchema, updateParkingSensorSchema } from "../validations/parking_sensor.validation";
import { handleError } from "../utils/errorHandler";

class ParkingSensorController {
    async create(req: Request, res: Response) {
        const { error } = createParkingSensorSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const parkingSensor = await ParkingSensorService.createParkingSensor(req.body);
            return res.status(201).json(parkingSensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar o sensor de estacionamento.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensors = await ParkingSensorService.getParkingSensors(page, pageSize);
            return res.json(parkingSensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores de estacionamento.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const parkingSensor = await ParkingSensorService.getParkingSensorById(req.params.id);
            if (!parkingSensor) return handleError(res, new Error("Sensor de estacionamento não encontrado."), "Sensor de estacionamento não encontrado.", 404);

            return res.json(parkingSensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar o sensor de estacionamento.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateParkingSensorSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedParkingSensor = await ParkingSensorService.updateParkingSensor(req.params.id, req.body);
            return res.json(updatedParkingSensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar o sensor de estacionamento.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await ParkingSensorService.deleteParkingSensor(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar o sensor de estacionamento.", 400);
        }
    }

    async getByParkingId(req: Request, res: Response) {
        try {
            const parkingId = req.params.parkingId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensors = await ParkingSensorService.getParkingSensorsByParkingId(parkingId, page, pageSize);
            return res.json(parkingSensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores do estacionamento.", 400);
        }
    }

    async getByType(req: Request, res: Response) {
        try {
            const type = req.params.type;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensors = await ParkingSensorService.getParkingSensorsByType(type, page, pageSize);
            return res.json(parkingSensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores por tipo.", 400);
        }
    }

    async getActive(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensors = await ParkingSensorService.getActiveParkingSensors(page, pageSize);
            return res.json(parkingSensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores ativos.", 400);
        }
    }
}

export default new ParkingSensorController();

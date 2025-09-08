import { Request, Response } from "express";
import ParkingSensorDataService from "../services/parking_sensor_data.service";
import { createParkingSensorDataSchema, updateParkingSensorDataSchema } from "../validations/parking_sensor_data.validation";
import { handleError } from "../utils/errorHandler";

class ParkingSensorDataController {
    async create(req: Request, res: Response) {
        const { error } = createParkingSensorDataSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const parkingSensorData = await ParkingSensorDataService.createParkingSensorData(req.body);
            return res.status(201).json(parkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar os dados do sensor de estacionamento.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensorData = await ParkingSensorDataService.getParkingSensorData(page, pageSize);
            return res.json(parkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados dos sensores de estacionamento.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const parkingSensorData = await ParkingSensorDataService.getParkingSensorDataById(req.params.id);
            if (!parkingSensorData) return handleError(res, new Error("Dados do sensor de estacionamento não encontrados."), "Dados do sensor de estacionamento não encontrados.", 404);

            return res.json(parkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados do sensor de estacionamento.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateParkingSensorDataSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedParkingSensorData = await ParkingSensorDataService.updateParkingSensorData(req.params.id, req.body);
            return res.json(updatedParkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar os dados do sensor de estacionamento.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await ParkingSensorDataService.deleteParkingSensorData(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar os dados do sensor de estacionamento.", 400);
        }
    }

    async getByParkingSensorId(req: Request, res: Response) {
        try {
            const parkingSensorId = req.params.parkingSensorId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensorData = await ParkingSensorDataService.getParkingSensorDataByParkingSensorId(parkingSensorId, page, pageSize);
            return res.json(parkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados do sensor específico.", 400);
        }
    }

    async getByParkingId(req: Request, res: Response) {
        try {
            const parkingId = req.params.parkingId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const parkingSensorData = await ParkingSensorDataService.getParkingSensorDataByParkingId(parkingId, page, pageSize);
            return res.json(parkingSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados dos sensores do estacionamento.", 400);
        }
    }
}

export default new ParkingSensorDataController();

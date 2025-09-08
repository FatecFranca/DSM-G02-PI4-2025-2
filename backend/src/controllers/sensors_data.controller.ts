import { Request, Response } from "express";
import SensorsDataService from "../services/sensors_data.service";
import { createSensorsDataSchema, updateSensorsDataSchema } from "../validations/sensors_data.validation";
import { handleError } from "../utils/errorHandler";

class SensorsDataController {
    async create(req: Request, res: Response) {
        const { error } = createSensorsDataSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const sensorData = await SensorsDataService.createSensorData(req.body);
            return res.status(201).json(sensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar os dados do sensor.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensorsData = await SensorsDataService.getSensorsData(page, pageSize);
            return res.json(sensorsData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados dos sensores.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const sensorData = await SensorsDataService.getSensorDataById(req.params.id);
            if (!sensorData) return handleError(res, new Error("Dados do sensor não encontrados."), "Dados do sensor não encontrados.", 404);

            return res.json(sensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados do sensor.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateSensorsDataSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedSensorData = await SensorsDataService.updateSensorData(req.params.id, req.body);
            return res.json(updatedSensorData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar os dados do sensor.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await SensorsDataService.deleteSensorData(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar os dados do sensor.", 400);
        }
    }

    async getBySensorId(req: Request, res: Response) {
        try {
            const sensorId = req.params.sensorId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensorsData = await SensorsDataService.getSensorsDataBySensorId(sensorId, page, pageSize);
            return res.json(sensorsData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados do sensor específico.", 400);
        }
    }

    async getByParkingSlotId(req: Request, res: Response) {
        try {
            const parkingSlotId = req.params.parkingSlotId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensorsData = await SensorsDataService.getSensorsDataByParkingSlotId(parkingSlotId, page, pageSize);
            return res.json(sensorsData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados dos sensores da vaga.", 400);
        }
    }

    async getActive(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensorsData = await SensorsDataService.getActiveSensorsData(page, pageSize);
            return res.json(sensorsData);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os dados dos sensores ativos.", 400);
        }
    }
}

export default new SensorsDataController();

import { Request, Response } from "express";
import SensorsService from "../services/sensors.service";
import { createSensorsSchema, updateSensorsSchema } from "../validations/sensors.validation";
import { handleError } from "../utils/errorHandler";

class SensorsController {
    async create(req: Request, res: Response) {
        const { error } = createSensorsSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const sensor = await SensorsService.createSensor(req.body);
            return res.status(201).json(sensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar o sensor.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensors = await SensorsService.getSensors(page, pageSize);
            return res.json(sensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const sensor = await SensorsService.getSensorById(req.params.id);
            if (!sensor) return handleError(res, new Error("Sensor não encontrado."), "Sensor não encontrado.", 404);

            return res.json(sensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar o sensor.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateSensorsSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedSensor = await SensorsService.updateSensor(req.params.id, req.body);
            return res.json(updatedSensor);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar o sensor.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await SensorsService.deleteSensor(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar o sensor.", 400);
        }
    }

    async getByParkingSlotId(req: Request, res: Response) {
        try {
            const parkingSlotId = req.params.parkingSlotId;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensors = await SensorsService.getSensorsByParkingSlotId(parkingSlotId, page, pageSize);
            return res.json(sensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores da vaga.", 400);
        }
    }

    async getByType(req: Request, res: Response) {
        try {
            const type = req.params.type;
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensors = await SensorsService.getSensorsByType(type, page, pageSize);
            return res.json(sensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores por tipo.", 400);
        }
    }

    async getActive(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const sensors = await SensorsService.getActiveSensors(page, pageSize);
            return res.json(sensors);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar os sensores ativos.", 400);
        }
    }
}

export default new SensorsController();

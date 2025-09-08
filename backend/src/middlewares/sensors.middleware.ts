import { Request, Response, NextFunction } from "express";
import SensorsService from "../services/sensors.service";

export const validateSensorExists = async (req: Request, res: Response, next: NextFunction) => {
    const sensorId = req.params.id;
    const existingSensor = await SensorsService.getSensorById(sensorId);

    if (!existingSensor) {
        return res.status(404).json({ message: "Sensor não encontrado." });
    }
    next();
};

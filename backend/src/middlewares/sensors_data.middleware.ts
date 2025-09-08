import { Request, Response, NextFunction } from "express";
import SensorsDataService from "../services/sensors_data.service";

export const validateSensorDataExists = async (req: Request, res: Response, next: NextFunction) => {
    const sensorDataId = req.params.id;
    const existingSensorData = await SensorsDataService.getSensorDataById(sensorDataId);

    if (!existingSensorData) {
        return res.status(404).json({ message: "Dados do sensor não encontrados." });
    }
    next();
};

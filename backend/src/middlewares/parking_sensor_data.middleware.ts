import { Request, Response, NextFunction } from "express";
import ParkingSensorDataService from "../services/parking_sensor_data.service";

export const validateParkingSensorDataExists = async (req: Request, res: Response, next: NextFunction) => {
    const parkingSensorDataId = req.params.id;
    const existingParkingSensorData = await ParkingSensorDataService.getParkingSensorDataById(parkingSensorDataId);

    if (!existingParkingSensorData) {
        return res.status(404).json({ message: "Dados do sensor de estacionamento não encontrados." });
    }
    next();
};

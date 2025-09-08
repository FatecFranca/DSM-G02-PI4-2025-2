import { Request, Response, NextFunction } from "express";
import ParkingSensorService from "../services/parking_sensor.service";

export const validateParkingSensorExists = async (req: Request, res: Response, next: NextFunction) => {
    const parkingSensorId = req.params.id;
    const existingParkingSensor = await ParkingSensorService.getParkingSensorById(parkingSensorId);

    if (!existingParkingSensor) {
        return res.status(404).json({ message: "Sensor de estacionamento não encontrado." });
    }
    next();
};

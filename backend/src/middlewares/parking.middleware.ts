import { Request, Response, NextFunction } from "express";
import ParkingService from "../services/parking.service";

export const validateParkingExists = async (req: Request, res: Response, next: NextFunction) => {
    const parkingId = req.params.id;
    const existingParking = await ParkingService.getParkingById(parkingId);

    if (!existingParking) {
        return res.status(404).json({ message: "Estacionamento não encontrado." });
    }
    next();
};

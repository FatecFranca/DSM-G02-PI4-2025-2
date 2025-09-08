import { Request, Response, NextFunction } from "express";
import ParkingSlotService from "../services/parking_slot.service";

export const validateParkingSlotExists = async (req: Request, res: Response, next: NextFunction) => {
    const parkingSlotId = req.params.id;
    const existingParkingSlot = await ParkingSlotService.getParkingSlotById(parkingSlotId);

    if (!existingParkingSlot) {
        return res.status(404).json({ message: "Vaga de estacionamento não encontrada." });
    }
    next();
};

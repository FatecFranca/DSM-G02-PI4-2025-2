import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

class ActivePlatesController {
  async getActivePlates(req: Request, res: Response) {
    try {
      const now = new Date();
      
      // Buscar reservas que estão ativas no momento atual
      const activeReservations = await prisma.reservation.findMany({
        where: {
          startTime: { lte: now },
          endTime: { gt: now }
        },
        select: {
          vehiclePlate: true,
          parkingSlotId: true,
          startTime: true,
          endTime: true,
          parkingSlot: {
            select: {
              number: true,
              parking: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          startTime: 'asc'
        }
      });

      // Retornar apenas as placas únicas com informações adicionais
      const plates = activeReservations.map(reservation => ({
        plate: reservation.vehiclePlate,
        parkingSlotId: reservation.parkingSlotId,
        slotNumber: reservation.parkingSlot.number,
        parkingName: reservation.parkingSlot.parking.name,
        startTime: reservation.startTime,
        endTime: reservation.endTime
      }));

      return res.json(plates);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao buscar placas ativas.");
    }
  }
}

export default new ActivePlatesController();

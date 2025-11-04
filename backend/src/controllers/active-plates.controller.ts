import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

class ActivePlatesController {
  async getActivePlates(req: Request, res: Response) {
    try {
      // Hora atual em UTC
      const now = new Date();
      const nowUTC = new Date(now.toISOString()); // garante UTC

      // Buscar reservas ativas no momento atual (em UTC)
      const activeReservations = await prisma.reservation.findMany({
        where: {
          startTime: { lte: nowUTC },
          endTime: { gt: nowUTC },
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
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          startTime: 'asc',
        },
      });

      // Mapear para retorno com informações adicionais
      const plates = activeReservations.map(reservation => ({
        plate: reservation.vehiclePlate,
        parkingSlotId: reservation.parkingSlotId,
        slotNumber: reservation.parkingSlot?.number || null,
        parkingName: reservation.parkingSlot?.parking?.name || null,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      }));

      return res.json(plates);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao buscar placas ativas.");
    }
  }
}

export default new ActivePlatesController();

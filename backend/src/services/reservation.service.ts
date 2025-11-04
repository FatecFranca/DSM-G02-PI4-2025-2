import { PrismaClient } from "@prisma/client";
import { scheduleReservationWindow } from "../utils/scheduler";

const prisma = new PrismaClient();

export type CreateReservationInput = {
  parkingSlotId: string;
  vehiclePlate: string;
  date: string; // e.g., 2025-09-13 (local date string)
  startHour: string; // e.g., "06:00" (HH:mm)
  durationHours: number; // e.g., 1
  userId: string;
};

function toUtc(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  // Cria Date em UTC, subtraindo 3h de Brasília
  const dateUtc = new Date(Date.UTC(year, month - 1, day, hour + 3, minute, 0));
  return dateUtc;
}

class ReservationService {
  async create(input: CreateReservationInput) {
    const { parkingSlotId, vehiclePlate, date, startHour, durationHours, userId } = input;

    const startTime = toUtc(date, startHour);
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

    if (endTime <= startTime) {
      throw new Error("O término deve ser maior que o início.");
    }

    const slot = await prisma.parkingSlot.findUnique({ where: { id: parkingSlotId } });
    if (!slot || !slot.isActive) {
      throw new Error("Vaga inexistente ou inativa.");
    }

    // Check overlapping reservations for the same slot
    const overlap = await prisma.reservation.findFirst({
      where: {
        parkingSlotId,
        OR: [
          { startTime: { lt: endTime }, endTime: { gt: startTime } },
        ],
      },
    });
    if (overlap) {
      throw new Error("Já existe uma reserva nesse intervalo.");
    }

    const reservation = await prisma.reservation.create({
      data: { parkingSlotId, vehiclePlate, startTime, endTime, userId },
    });

    // schedule availability toggling
    try { await scheduleReservationWindow(reservation.id); } catch { }

    return reservation;
  }

  async list(params: { parkingSlotId?: string } = {}) {
    return prisma.reservation.findMany({
      where: { parkingSlotId: params.parkingSlotId },
      orderBy: { startTime: "desc" },
    });
  }

  async listByUser(userId: string) {
    return prisma.reservation.findMany({
      where: { userId },
      include: {
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
      orderBy: { startTime: "desc" },
    });
  }

  async getById(id: string) {
    const resv = await prisma.reservation.findUnique({ where: { id } });
    if (!resv) throw new Error("Reserva não encontrada.");
    return resv;
  }

  async update(id: string, input: CreateReservationInput) {
    const { parkingSlotId, vehiclePlate, date, startHour, durationHours, userId } = input;

    // Verificar se a reserva existe e pertence ao usuário
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
      include: { parkingSlot: true }
    });

    if (!existingReservation) {
      throw new Error("Reserva não encontrada.");
    }

    if (existingReservation.userId !== userId) {
      throw new Error("Você não tem permissão para editar esta reserva.");
    }

    const startTime = toUtc(date, startHour);
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

    if (endTime <= startTime) {
      throw new Error("O término deve ser maior que o início.");
    }

    const slot = await prisma.parkingSlot.findUnique({ where: { id: parkingSlotId } });
    if (!slot || !slot.isActive) {
      throw new Error("Vaga inexistente ou inativa.");
    }

    // Check overlapping reservations for the same slot (excluding current reservation)
    const overlap = await prisma.reservation.findFirst({
      where: {
        parkingSlotId,
        id: { not: id },
        OR: [
          { startTime: { lt: endTime }, endTime: { gt: startTime } },
        ],
      },
    });
    if (overlap) {
      throw new Error("Já existe uma reserva nesse intervalo.");
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { parkingSlotId, vehiclePlate, startTime, endTime },
    });

    return reservation;
  }

  async cancel(id: string, userId: string) {
    // Verificar se a reserva existe e pertence ao usuário
    const reservation = await prisma.reservation.findUnique({ where: { id } });

    if (!reservation) {
      throw new Error("Reserva não encontrada.");
    }

    if (reservation.userId !== userId) {
      throw new Error("Você não tem permissão para cancelar esta reserva.");
    }

    await prisma.reservation.delete({ where: { id } });
    return { id, cancelled: true };
  }

  async getActivePlates() {
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
        endTime: true
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    // Retornar apenas as placas únicas com informações adicionais
    const plates = activeReservations.map(reservation => ({
      plate: reservation.vehiclePlate,
      parkingSlotId: reservation.parkingSlotId,
      startTime: reservation.startTime,
      endTime: reservation.endTime
    }));

    return plates;
  }
}

export default new ReservationService();



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
  // Combine date and time into ISO and let JS parse in local TZ, then convert to UTC date
  const local = new Date(`${dateStr}T${timeStr}:00`);
  return new Date(local.toISOString());
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
    try { await scheduleReservationWindow(reservation.id); } catch {}

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
      orderBy: { startTime: "desc" },
    });
  }

  async getById(id: string) {
    const resv = await prisma.reservation.findUnique({ where: { id } });
    if (!resv) throw new Error("Reserva não encontrada.");
    return resv;
  }

  async cancel(id: string) {
    // simple delete cancel
    await this.getById(id);
    await prisma.reservation.delete({ where: { id } });
    return { id, cancelled: true };
  }
}

export default new ReservationService();



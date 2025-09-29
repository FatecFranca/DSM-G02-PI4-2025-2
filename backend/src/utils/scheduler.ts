import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function scheduleAt(date: Date, task: () => void) {
  const delay = date.getTime() - Date.now();
  if (delay <= 0) {
    setImmediate(task);
    return;
  }
  setTimeout(task, delay);
}

export async function scheduleReservationWindow(reservationId: string) {
  const resv = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!resv) return;

  scheduleAt(resv.startTime, async () => {
    try {
      await prisma.parkingSlot.update({ where: { id: resv.parkingSlotId }, data: { isAvailable: false } });
    } catch {}
  });

  scheduleAt(resv.endTime, async () => {
    try {
      // Only free if there is no other ongoing reservation overlapping now
      const now = new Date();
      const overlapping = await prisma.reservation.findFirst({
        where: {
          parkingSlotId: resv.parkingSlotId,
          startTime: { lt: now },
          endTime: { gt: now },
        },
      });
      if (!overlapping) {
        await prisma.parkingSlot.update({ where: { id: resv.parkingSlotId }, data: { isAvailable: true } });
      }
    } catch {}
  });
}



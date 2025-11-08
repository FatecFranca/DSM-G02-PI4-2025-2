import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StatisticsService {
  async getOverview() {
    const [
      parkings,
      activeParkings,
      sensors,
      activeSensors,
      parkingSensors,
      activeParkingSensors,
      sensorsData,
      parkingSensorsData
    ] = await Promise.all([
      prisma.parking.count(),
      prisma.parking.count({ where: { isActive: true } }),
      prisma.sensors.count(),
      prisma.sensors.count({ where: { isActive: true } }),
      prisma.parkingSensor.count(),
      prisma.parkingSensor.count({ where: { isActive: true } }),
      prisma.sensorsData.count(),
      prisma.parkingSensorData.count()
    ]);

    // buscar todas as vagas e seus sensores
    const parkingSlots = await prisma.parkingSlot.findMany({
      include: {
        Sensors: {
          where: { isActive: true },
          include: {
            SensorsData: {
              orderBy: { createdAt: "desc" },
              take: 1
            }
          }
        }
      }
    });

    let livre = 0;
    let ocupada = 0;
    let manutencao = 0;

    for (const slot of parkingSlots) {
      // Se a vaga estiver desativada manualmente → manutenção
      if (!slot.isActive) {
        manutencao++;
        continue;
      }

      // Se não houver sensores ativos → manutenção
      if (!slot.Sensors.length) {
        manutencao++;
        continue;
      }

      // pegar o último registro disponível entre os sensores
      const lastData = slot.Sensors
        .map((s: { SensorsData: { data: string }[] }) => s.SensorsData[0]?.data)
        .find((d: string | undefined) => d !== undefined);

      if (!lastData) {
        manutencao++;
      } else if (lastData === "FREE") {
        livre++;
      } else if (lastData === "PRESENT") {
        ocupada++;
      } else {
        manutencao++; // qualquer dado inesperado
      }
    }

    return {
      parkings: {
        total: parkings,
        active: activeParkings
      },
      parkingSlots: {
        total: parkingSlots.length,
        livre,
        ocupada,
        manutencao
      },
      sensors: {
        total: sensors,
        active: activeSensors
      },
      parkingSensors: {
        total: parkingSensors,
        active: activeParkingSensors
      },
      dataPoints: {
        sensorsData,
        parkingSensorsData
      }
    };
  }
}

export default new StatisticsService();

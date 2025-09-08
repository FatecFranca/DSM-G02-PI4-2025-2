import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StatisticsService {
	async getOverview() {
		const [
			parkings,
			activeParkings,
			parkingSlots,
			availableSlots,
			occupiedSlots,
			sensors,
			activeSensors,
			parkingSensors,
			activeParkingSensors,
			sensorsData,
			parkingSensorsData
		] = await Promise.all([
			prisma.parking.count(),
			prisma.parking.count({ where: { isActive: true } }),
			prisma.parkingSlot.count(),
			prisma.parkingSlot.count({ where: { isAvailable: true, isActive: true } }),
			prisma.parkingSlot.count({ where: { isAvailable: false, isActive: true } }),
			prisma.sensors.count(),
			prisma.sensors.count({ where: { isActive: true } }),
			prisma.parkingSensor.count(),
			prisma.parkingSensor.count({ where: { isActive: true } }),
			prisma.sensorsData.count(),
			prisma.parkingSensorData.count()
		]);

		return {
			parkings: {
				total: parkings,
				active: activeParkings
			},
			parkingSlots: {
				total: parkingSlots,
				available: availableSlots,
				occupied: occupiedSlots
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
				sensorsData: sensorsData,
				parkingSensorsData: parkingSensorsData
			}
		};
	}
}

export default new StatisticsService();

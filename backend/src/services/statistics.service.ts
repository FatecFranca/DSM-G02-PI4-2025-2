import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type ParkingSlotWithSensors = Prisma.ParkingSlotGetPayload<{
	include: {
		Sensors: {
			include: {
				SensorsData: true;
			};
		};
	};
}>;

class StatisticsService {
	private readonly OCCUPIED_VALUES = new Set(["PRESENT", "OCUPADO", "OCUPIED", "BUSY", "1", "TRUE"]);
	private readonly FREE_VALUES = new Set(["FREE", "LIVRE", "AVAILABLE", "0", "FALSE"]);

	private normalizeSensorValue(raw?: string | null): string | null {
		if (raw == null) return null;

		let value: unknown = raw;

		try {
			const parsed = JSON.parse(raw);
			value = parsed;
		} catch {
			value = raw;
		}

		if (typeof value === "object" && value !== null) {
			const candidate = value as Record<string, unknown>;
			if (candidate.status != null) {
				value = candidate.status;
			} else if (candidate.value != null) {
				value = candidate.value;
			}
		}

		if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
		if (typeof value === "number") return value.toString();

		return String(value).toUpperCase().trim();
	}

	private getLatestSensorData(slot: ParkingSlotWithSensors) {
		let latest: (typeof slot.Sensors[number]["SensorsData"][number]) | null = null;

		for (const sensor of slot.Sensors) {
			const [data] = sensor.SensorsData;
			if (!data) continue;
			if (!latest || data.createdAt > latest.createdAt) {
				latest = data;
			}
		}

		return latest;
	}

	private computeParkingSlotStats(slots: ParkingSlotWithSensors[]) {
		let available = 0;
		let occupied = 0;

		for (const slot of slots) {
			if (!slot.isActive) continue;

			const latestData = this.getLatestSensorData(slot);
			const normalized = latestData ? this.normalizeSensorValue(latestData.data) : null;

			if (normalized && this.OCCUPIED_VALUES.has(normalized)) {
				occupied += 1;
				continue;
			}

			if (normalized && this.FREE_VALUES.has(normalized)) {
				available += 1;
				continue;
			}

			if (slot.isAvailable) {
				available += 1;
			} else {
				occupied += 1;
			}
		}

		return { available, occupied };
	}

	async getOverview() {
		const [
			parkings,
			activeParkings,
			sensors,
			activeSensors,
			parkingSensors,
			activeParkingSensors,
			sensorsData,
			parkingSensorsData,
			parkingSlotsWithSensors
		] = await Promise.all([
			prisma.parking.count(),
			prisma.parking.count({ where: { isActive: true } }),
			prisma.sensors.count(),
			prisma.sensors.count({ where: { isActive: true } }),
			prisma.parkingSensor.count(),
			prisma.parkingSensor.count({ where: { isActive: true } }),
			prisma.sensorsData.count(),
			prisma.parkingSensorData.count(),
			prisma.parkingSlot.findMany({
				include: {
					Sensors: {
						where: { isActive: true },
						include: {
							SensorsData: {
								where: { isActive: true },
								orderBy: { createdAt: "desc" },
								take: 1
							}
						}
					}
				}
			})
		]);

		const { available, occupied } = this.computeParkingSlotStats(parkingSlotsWithSensors);

		return {
			parkings: {
				total: parkings,
				active: activeParkings
			},
			parkingSlots: {
				total: parkingSlotsWithSensors.length,
				available,
				occupied
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

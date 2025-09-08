import { PrismaClient, Parking } from "@prisma/client";

const prisma = new PrismaClient();

class ParkingService {
    async createParking(data: Omit<Parking, "id" | "createdAt">) {
        return prisma.parking.create({
            data,
        });
    }

    async getParkingById(id: string) {
        return prisma.parking.findUnique({
            where: { id },
        });
    }

    async getParkings(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parking.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkings = await prisma.parking.findMany({
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalParkings = await prisma.parking.count();

        return {
            data: parkings,
            currentPage: page,
            totalPages: Math.ceil(totalParkings / pageSize),
            totalItems: totalParkings,
        };
    }

    async updateParking(id: string, data: Partial<Omit<Parking, "id" | "createdAt">>) {
        return prisma.parking.update({
            where: { id },
            data,
        });
    }

    async deleteParking(id: string) {
        return prisma.parking.delete({
            where: { id },
        });
    }

    async getActiveParkings(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parking.findMany({
                where: { isActive: true },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkings = await prisma.parking.findMany({
            where: { isActive: true },
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalParkings = await prisma.parking.count({
            where: { isActive: true }
        });

        return {
            data: parkings,
            currentPage: page,
            totalPages: Math.ceil(totalParkings / pageSize),
            totalItems: totalParkings,
        };
    }
}

export default new ParkingService();

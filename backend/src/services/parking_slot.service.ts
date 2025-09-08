import { PrismaClient, ParkingSlot } from "@prisma/client";

const prisma = new PrismaClient();

class ParkingSlotService {
    async createParkingSlot(data: Omit<ParkingSlot, "id" | "createdAt" | "updatedAt">) {
        return prisma.parkingSlot.create({
            data,
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            }
        });
    }

    async getParkingSlotById(id: string) {
        return prisma.parkingSlot.findUnique({
            where: { id },
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            }
        });
    }

    async getParkingSlots(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSlot.findMany({
                include: {
                    parking: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkingSlots = await prisma.parkingSlot.findMany({
            skip,
            take: pageSize,
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalParkingSlots = await prisma.parkingSlot.count();

        return {
            data: parkingSlots,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSlots / pageSize),
            totalItems: totalParkingSlots,
        };
    }

    async updateParkingSlot(id: string, data: Partial<Omit<ParkingSlot, "id" | "createdAt" | "updatedAt">>) {
        return prisma.parkingSlot.update({
            where: { id },
            data,
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            }
        });
    }

    async deleteParkingSlot(id: string) {
        return prisma.parkingSlot.delete({
            where: { id },
        });
    }

    async getParkingSlotsByParkingId(parkingId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSlot.findMany({
                where: { parkingId },
                include: {
                    parking: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true
                        }
                    }
                },
                orderBy: {
                    number: 'asc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkingSlots = await prisma.parkingSlot.findMany({
            where: { parkingId },
            skip,
            take: pageSize,
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            },
            orderBy: {
                number: 'asc'
            }
        });

        const totalParkingSlots = await prisma.parkingSlot.count({
            where: { parkingId }
        });

        return {
            data: parkingSlots,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSlots / pageSize),
            totalItems: totalParkingSlots,
        };
    }

    async getAvailableParkingSlots(parkingId?: string, page?: number, pageSize?: number) {
        const whereClause = parkingId 
            ? { parkingId, isAvailable: true, isActive: true }
            : { isAvailable: true, isActive: true };

        if (!page || !pageSize) {
            return prisma.parkingSlot.findMany({
                where: whereClause,
                include: {
                    parking: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true
                        }
                    }
                },
                orderBy: {
                    number: 'asc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkingSlots = await prisma.parkingSlot.findMany({
            where: whereClause,
            skip,
            take: pageSize,
            include: {
                parking: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            },
            orderBy: {
                number: 'asc'
            }
        });

        const totalParkingSlots = await prisma.parkingSlot.count({
            where: whereClause
        });

        return {
            data: parkingSlots,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSlots / pageSize),
            totalItems: totalParkingSlots,
        };
    }
}

export default new ParkingSlotService();

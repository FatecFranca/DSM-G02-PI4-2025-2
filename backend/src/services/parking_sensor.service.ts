import { PrismaClient, ParkingSensor } from "@prisma/client";

const prisma = new PrismaClient();

class ParkingSensorService {
    async createParkingSensor(data: Omit<ParkingSensor, "id" | "createdAt" | "updatedAt">) {
        return prisma.parkingSensor.create({
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

    async getParkingSensorById(id: string) {
        return prisma.parkingSensor.findUnique({
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

    async getParkingSensors(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensor.findMany({
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
        const parkingSensors = await prisma.parkingSensor.findMany({
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

        const totalParkingSensors = await prisma.parkingSensor.count();

        return {
            data: parkingSensors,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensors / pageSize),
            totalItems: totalParkingSensors,
        };
    }

    async updateParkingSensor(id: string, data: Partial<Omit<ParkingSensor, "id" | "createdAt" | "updatedAt">>) {
        return prisma.parkingSensor.update({
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

    async deleteParkingSensor(id: string) {
        return prisma.parkingSensor.delete({
            where: { id },
        });
    }

    async getParkingSensorsByParkingId(parkingId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensor.findMany({
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
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const parkingSensors = await prisma.parkingSensor.findMany({
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
                createdAt: 'desc'
            }
        });

        const totalParkingSensors = await prisma.parkingSensor.count({
            where: { parkingId }
        });

        return {
            data: parkingSensors,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensors / pageSize),
            totalItems: totalParkingSensors,
        };
    }

    async getParkingSensorsByType(type: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensor.findMany({
                where: { type: type as any },
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
        const parkingSensors = await prisma.parkingSensor.findMany({
            where: { type: type as any },
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

        const totalParkingSensors = await prisma.parkingSensor.count({
            where: { type: type as any }
        });

        return {
            data: parkingSensors,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensors / pageSize),
            totalItems: totalParkingSensors,
        };
    }

    async getActiveParkingSensors(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensor.findMany({
                where: { isActive: true },
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
        const parkingSensors = await prisma.parkingSensor.findMany({
            where: { isActive: true },
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

        const totalParkingSensors = await prisma.parkingSensor.count({
            where: { isActive: true }
        });

        return {
            data: parkingSensors,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensors / pageSize),
            totalItems: totalParkingSensors,
        };
    }
}

export default new ParkingSensorService();

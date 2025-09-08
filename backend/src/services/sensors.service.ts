import { PrismaClient, Sensors } from "@prisma/client";

const prisma = new PrismaClient();

class SensorsService {
    async createSensor(data: Omit<Sensors, "id" | "createdAt" | "updatedAt">) {
        return prisma.sensors.create({
            data,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getSensorById(id: string) {
        return prisma.sensors.findUnique({
            where: { id },
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getSensors(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensors.findMany({
                include: {
                    parkingSlot: {
                        select: {
                            id: true,
                            number: true,
                            parking: {
                                select: {
                                    id: true,
                                    name: true,
                                    address: true,
                                    city: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensors = await prisma.sensors.findMany({
            skip,
            take: pageSize,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensors = await prisma.sensors.count();

        return {
            data: sensors,
            currentPage: page,
            totalPages: Math.ceil(totalSensors / pageSize),
            totalItems: totalSensors,
        };
    }

    async updateSensor(id: string, data: Partial<Omit<Sensors, "id" | "createdAt" | "updatedAt">>) {
        return prisma.sensors.update({
            where: { id },
            data,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            }
        });
    }

    async deleteSensor(id: string) {
        return prisma.sensors.delete({
            where: { id },
        });
    }

    async getSensorsByParkingSlotId(parkingSlotId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensors.findMany({
                where: { parkingSlotId },
                include: {
                    parkingSlot: {
                        select: {
                            id: true,
                            number: true,
                            parking: {
                                select: {
                                    id: true,
                                    name: true,
                                    address: true,
                                    city: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensors = await prisma.sensors.findMany({
            where: { parkingSlotId },
            skip,
            take: pageSize,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensors = await prisma.sensors.count({
            where: { parkingSlotId }
        });

        return {
            data: sensors,
            currentPage: page,
            totalPages: Math.ceil(totalSensors / pageSize),
            totalItems: totalSensors,
        };
    }

    async getSensorsByType(type: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensors.findMany({
                where: { type: type as any },
                include: {
                    parkingSlot: {
                        select: {
                            id: true,
                            number: true,
                            parking: {
                                select: {
                                    id: true,
                                    name: true,
                                    address: true,
                                    city: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensors = await prisma.sensors.findMany({
            where: { type: type as any },
            skip,
            take: pageSize,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensors = await prisma.sensors.count({
            where: { type: type as any }
        });

        return {
            data: sensors,
            currentPage: page,
            totalPages: Math.ceil(totalSensors / pageSize),
            totalItems: totalSensors,
        };
    }

    async getActiveSensors(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensors.findMany({
                where: { isActive: true },
                include: {
                    parkingSlot: {
                        select: {
                            id: true,
                            number: true,
                            parking: {
                                select: {
                                    id: true,
                                    name: true,
                                    address: true,
                                    city: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensors = await prisma.sensors.findMany({
            where: { isActive: true },
            skip,
            take: pageSize,
            include: {
                parkingSlot: {
                    select: {
                        id: true,
                        number: true,
                        parking: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                city: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensors = await prisma.sensors.count({
            where: { isActive: true }
        });

        return {
            data: sensors,
            currentPage: page,
            totalPages: Math.ceil(totalSensors / pageSize),
            totalItems: totalSensors,
        };
    }
}

export default new SensorsService();

import { PrismaClient, ParkingSensorData } from "@prisma/client";

const prisma = new PrismaClient();

class ParkingSensorDataService {
    async createParkingSensorData(data: Omit<ParkingSensorData, "id" | "createdAt">) {
        return prisma.parkingSensorData.create({
            data,
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

    async getParkingSensorDataById(id: string) {
        return prisma.parkingSensorData.findUnique({
            where: { id },
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

    async getParkingSensorData(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensorData.findMany({
                include: {
                    parkingSensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
        const parkingSensorData = await prisma.parkingSensorData.findMany({
            skip,
            take: pageSize,
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

        const totalParkingSensorData = await prisma.parkingSensorData.count();

        return {
            data: parkingSensorData,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensorData / pageSize),
            totalItems: totalParkingSensorData,
        };
    }

    async updateParkingSensorData(id: string, data: Partial<Omit<ParkingSensorData, "id" | "createdAt">>) {
        return prisma.parkingSensorData.update({
            where: { id },
            data,
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

    async deleteParkingSensorData(id: string) {
        return prisma.parkingSensorData.delete({
            where: { id },
        });
    }

    async getParkingSensorDataByParkingSensorId(parkingSensorId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensorData.findMany({
                where: { parkingSensorId },
                include: {
                    parkingSensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
        const parkingSensorData = await prisma.parkingSensorData.findMany({
            where: { parkingSensorId },
            skip,
            take: pageSize,
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

        const totalParkingSensorData = await prisma.parkingSensorData.count({
            where: { parkingSensorId }
        });

        return {
            data: parkingSensorData,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensorData / pageSize),
            totalItems: totalParkingSensorData,
        };
    }

    async getParkingSensorDataByParkingId(parkingId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.parkingSensorData.findMany({
                where: {
                    parkingSensor: {
                        parkingId
                    }
                },
                include: {
                    parkingSensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
        const parkingSensorData = await prisma.parkingSensorData.findMany({
            where: {
                parkingSensor: {
                    parkingId
                }
            },
            skip,
            take: pageSize,
            include: {
                parkingSensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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

        const totalParkingSensorData = await prisma.parkingSensorData.count({
            where: {
                parkingSensor: {
                    parkingId
                }
            }
        });

        return {
            data: parkingSensorData,
            currentPage: page,
            totalPages: Math.ceil(totalParkingSensorData / pageSize),
            totalItems: totalParkingSensorData,
        };
    }
}

export default new ParkingSensorDataService();

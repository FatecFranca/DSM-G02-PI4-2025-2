import { PrismaClient, SensorsData } from "@prisma/client";

const prisma = new PrismaClient();

class SensorsDataService {
    async createSensorData(data: Omit<SensorsData, "id" | "createdAt">) {
        return prisma.sensorsData.create({
            data,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            }
        });
    }

    async getSensorDataById(id: string) {
        return prisma.sensorsData.findUnique({
            where: { id },
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            }
        });
    }

    async getSensorsData(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensorsData.findMany({
                include: {
                    sensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensorsData = await prisma.sensorsData.findMany({
            skip,
            take: pageSize,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensorsData = await prisma.sensorsData.count();

        return {
            data: sensorsData,
            currentPage: page,
            totalPages: Math.ceil(totalSensorsData / pageSize),
            totalItems: totalSensorsData,
        };
    }

    async updateSensorData(id: string, data: Partial<Omit<SensorsData, "id" | "createdAt">>) {
        return prisma.sensorsData.update({
            where: { id },
            data,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            }
        });
    }

    async deleteSensorData(id: string) {
        return prisma.sensorsData.delete({
            where: { id },
        });
    }

    async getSensorsDataBySensorId(sensorId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensorsData.findMany({
                where: { sensorId },
                include: {
                    sensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensorsData = await prisma.sensorsData.findMany({
            where: { sensorId },
            skip,
            take: pageSize,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensorsData = await prisma.sensorsData.count({
            where: { sensorId }
        });

        return {
            data: sensorsData,
            currentPage: page,
            totalPages: Math.ceil(totalSensorsData / pageSize),
            totalItems: totalSensorsData,
        };
    }

    async getSensorsDataByParkingSlotId(parkingSlotId: string, page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensorsData.findMany({
                where: {
                    sensor: {
                        parkingSlotId
                    }
                },
                include: {
                    sensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensorsData = await prisma.sensorsData.findMany({
            where: {
                sensor: {
                    parkingSlotId
                }
            },
            skip,
            take: pageSize,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensorsData = await prisma.sensorsData.count({
            where: {
                sensor: {
                    parkingSlotId
                }
            }
        });

        return {
            data: sensorsData,
            currentPage: page,
            totalPages: Math.ceil(totalSensorsData / pageSize),
            totalItems: totalSensorsData,
        };
    }

    async getActiveSensorsData(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.sensorsData.findMany({
                where: { isActive: true },
                include: {
                    sensor: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
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
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const sensorsData = await prisma.sensorsData.findMany({
            where: { isActive: true },
            skip,
            take: pageSize,
            include: {
                sensor: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalSensorsData = await prisma.sensorsData.count({
            where: { isActive: true }
        });

        return {
            data: sensorsData,
            currentPage: page,
            totalPages: Math.ceil(totalSensorsData / pageSize),
            totalItems: totalSensorsData,
        };
    }
}

export default new SensorsDataService();

-- CreateEnum
CREATE TYPE "SensorParkingType" AS ENUM ('TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS');

-- CreateTable
CREATE TABLE "ParkingSensor" (
    "id" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "SensorParkingType" NOT NULL,

    CONSTRAINT "ParkingSensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSensorData" (
    "id" TEXT NOT NULL,
    "parkingSensorId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParkingSensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorsData" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL,

    CONSTRAINT "SensorsData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParkingSensor" ADD CONSTRAINT "ParkingSensor_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSensorData" ADD CONSTRAINT "ParkingSensorData_parkingSensorId_fkey" FOREIGN KEY ("parkingSensorId") REFERENCES "ParkingSensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorsData" ADD CONSTRAINT "SensorsData_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

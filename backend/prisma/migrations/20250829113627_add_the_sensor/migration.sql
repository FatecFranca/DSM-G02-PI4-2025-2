-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('IR', 'ULTRASONIC', 'RFID', 'CAMERA');

-- CreateTable
CREATE TABLE "Sensors" (
    "id" TEXT NOT NULL,
    "parkingSlotId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "SensorType" NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sensors" ADD CONSTRAINT "Sensors_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "ParkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

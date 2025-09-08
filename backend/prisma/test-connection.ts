import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...');
    
    // Testar conexão básica
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Verificar se as tabelas existem
    console.log('📋 Verificando tabelas...');
    
    try {
      const contactCount = await prisma.contactMessage.count();
      console.log(`✅ ContactMessage: ${contactCount} registros`);
    } catch (error) {
      console.log('❌ ContactMessage: tabela não existe');
    }
    
    try {
      const parkingCount = await prisma.parking.count();
      console.log(`✅ Parking: ${parkingCount} registros`);
    } catch (error) {
      console.log('❌ Parking: tabela não existe');
    }
    
    try {
      const parkingSlotCount = await prisma.parkingSlot.count();
      console.log(`✅ ParkingSlot: ${parkingSlotCount} registros`);
    } catch (error) {
      console.log('❌ ParkingSlot: tabela não existe');
    }
    
    try {
      const sensorsCount = await prisma.sensors.count();
      console.log(`✅ Sensors: ${sensorsCount} registros`);
    } catch (error) {
      console.log('❌ Sensors: tabela não existe');
    }
    
    try {
      const parkingSensorCount = await prisma.parkingSensor.count();
      console.log(`✅ ParkingSensor: ${parkingSensorCount} registros`);
    } catch (error) {
      console.log('❌ ParkingSensor: tabela não existe');
    }
    
    try {
      const sensorsDataCount = await prisma.sensorsData.count();
      console.log(`✅ SensorsData: ${sensorsDataCount} registros`);
    } catch (error) {
      console.log('❌ SensorsData: tabela não existe');
    }
    
    try {
      const parkingSensorDataCount = await prisma.parkingSensorData.count();
      console.log(`✅ ParkingSensorData: ${parkingSensorDataCount} registros`);
    } catch (error) {
      console.log('❌ ParkingSensorData: tabela não existe');
    }
    
    console.log('\n🎯 Status do banco de dados verificado!');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

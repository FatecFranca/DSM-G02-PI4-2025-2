import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:8080';

interface TestResult {
  endpoint: string;
  method: string;
  duration: number;
  status: number;
  success: boolean;
}

class StressTest {
  private results: TestResult[] = [];
  private parkingIds: string[] = [];
  private parkingSlotIds: string[] = [];
  private sensorIds: string[] = [];
  private parkingSensorIds: string[] = [];

  async initialize() {
    console.log('🚀 Iniciando testes de stress...');
    
    // Buscar IDs existentes para usar nos testes
    const parkings = await prisma.parking.findMany({ take: 3 });
    this.parkingIds = parkings.map(p => p.id);

    const parkingSlots = await prisma.parkingSlot.findMany({ take: 10 });
    this.parkingSlotIds = parkingSlots.map(ps => ps.id);

    const sensors = await prisma.sensors.findMany({ take: 10 });
    this.sensorIds = sensors.map(s => s.id);

    const parkingSensors = await prisma.parkingSensor.findMany({ take: 5 });
    this.parkingSensorIds = parkingSensors.map(ps => ps.id);

    console.log(`📊 IDs coletados: ${this.parkingIds.length} parkings, ${this.parkingSlotIds.length} slots, ${this.sensorIds.length} sensors, ${this.parkingSensorIds.length} parking sensors`);
  }

  async runTest(endpoint: string, method: string, data?: any, params?: any): Promise<TestResult> {
    const startTime = Date.now();
    let status = 0;
    let success = false;

    try {
      const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        data,
        params,
        timeout: 10000
      };

      const response = await axios(config);
      status = response.status;
      success = status >= 200 && status < 300;
    } catch (error: any) {
      status = error.response?.status || 0;
      success = false;
    }

    const duration = Date.now() - startTime;

    return {
      endpoint,
      method,
      duration,
      status,
      success
    };
  }

  async testContactMessages() {
    console.log('📝 Testando endpoints de Contact Messages...');
    
    // Teste de criação
    for (let i = 0; i < 10; i++) {
      const result = await this.runTest('/contact-messages', 'POST', {
        name: `Test User ${i}`,
        email: `test${i}@example.com`,
        message: `Test message ${i} - ${new Date().toISOString()}`
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 5; i++) {
      const result = await this.runTest('/contact-messages', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }
  }

  async testParkings() {
    console.log('🏢 Testando endpoints de Parkings...');
    
    // Teste de criação
    for (let i = 0; i < 5; i++) {
      const result = await this.runTest('/parkings', 'POST', {
        name: `Stress Test Parking ${i}`,
        address: `Rua Teste ${i}, 123`,
        country: 'Brasil',
        state: 'SP',
        city: 'São Paulo',
        number: `${i + 100}`,
        phone: `(11) 99999-${i.toString().padStart(4, '0')}`,
        description: `Parking criado durante stress test ${i}`
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parkings', 'GET', undefined, {
        page: i + 1,
        pageSize: 5
      });
      this.results.push(result);
    }

    // Teste de busca por ID
    for (const parkingId of this.parkingIds) {
      const result = await this.runTest(`/parkings/${parkingId}`, 'GET');
      this.results.push(result);
    }

    // Teste de estacionamentos ativos
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parkings/active', 'GET', undefined, {
        page: i + 1,
        pageSize: 5
      });
      this.results.push(result);
    }
  }

  async testParkingSlots() {
    console.log('🅿️ Testando endpoints de Parking Slots...');
    
    // Teste de criação
    for (let i = 0; i < 10; i++) {
      const parkingId = this.parkingIds[i % this.parkingIds.length];
      const result = await this.runTest('/parking-slots', 'POST', {
        parkingId,
        number: i + 1000,
        isAvailable: Math.random() > 0.5,
        isActive: true
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parking-slots', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }

    // Teste de vagas por estacionamento
    for (const parkingId of this.parkingIds) {
      const result = await this.runTest(`/parking-slots/parking/${parkingId}`, 'GET');
      this.results.push(result);
    }

    // Teste de vagas disponíveis
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parking-slots/available', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }
  }

  async testSensors() {
    console.log('📡 Testando endpoints de Sensors...');
    
    // Teste de criação
    for (let i = 0; i < 10; i++) {
      const parkingSlotId = this.parkingSlotIds[i % this.parkingSlotIds.length];
      const sensorTypes = ['IR', 'ULTRASONIC', 'RFID', 'CAMERA'];
      const result = await this.runTest('/sensors', 'POST', {
        parkingSlotId,
        name: `Stress Test Sensor ${i}`,
        description: `Sensor criado durante stress test ${i}`,
        type: sensorTypes[i % sensorTypes.length],
        isActive: true
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/sensors', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }

    // Teste de sensores por tipo
    const sensorTypes = ['IR', 'ULTRASONIC', 'RFID', 'CAMERA'];
    for (const type of sensorTypes) {
      const result = await this.runTest(`/sensors/type/${type}`, 'GET');
      this.results.push(result);
    }

    // Teste de sensores ativos
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/sensors/active', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }
  }

  async testParkingSensors() {
    console.log('🌡️ Testando endpoints de Parking Sensors...');
    
    // Teste de criação
    for (let i = 0; i < 8; i++) {
      const parkingId = this.parkingIds[i % this.parkingIds.length];
      const sensorTypes = ['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS'];
      const result = await this.runTest('/parking-sensors', 'POST', {
        parkingId,
        name: `Stress Test Parking Sensor ${i}`,
        description: `Parking sensor criado durante stress test ${i}`,
        type: sensorTypes[i % sensorTypes.length],
        isActive: true
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parking-sensors', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }

    // Teste de sensores por tipo
    const sensorTypes = ['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE'];
    for (const type of sensorTypes) {
      const result = await this.runTest(`/parking-sensors/type/${type}`, 'GET');
      this.results.push(result);
    }

    // Teste de sensores por estacionamento
    for (const parkingId of this.parkingIds) {
      const result = await this.runTest(`/parking-sensors/parking/${parkingId}`, 'GET');
      this.results.push(result);
    }
  }

  async testSensorsData() {
    console.log('📊 Testando endpoints de Sensors Data...');
    
    // Teste de criação
    for (let i = 0; i < 20; i++) {
      const sensorId = this.sensorIds[i % this.sensorIds.length];
      const result = await this.runTest('/sensors-data', 'POST', {
        sensorId,
        data: JSON.stringify({
          timestamp: new Date().toISOString(),
          value: Math.random() * 100,
          status: Math.random() > 0.1 ? 'active' : 'error',
          battery: Math.random() * 100
        }),
        isActive: true
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/sensors-data', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }

    // Teste de dados por sensor
    for (const sensorId of this.sensorIds.slice(0, 5)) {
      const result = await this.runTest(`/sensors-data/sensor/${sensorId}`, 'GET');
      this.results.push(result);
    }
  }

  async testParkingSensorData() {
    console.log('📈 Testando endpoints de Parking Sensor Data...');
    
    // Teste de criação
    for (let i = 0; i < 15; i++) {
      const parkingSensorId = this.parkingSensorIds[i % this.parkingSensorIds.length];
      const result = await this.runTest('/parking-sensor-data', 'POST', {
        parkingSensorId,
        data: JSON.stringify({
          timestamp: new Date().toISOString(),
          value: Math.random() * 100,
          unit: '°C',
          status: Math.random() > 0.05 ? 'normal' : 'warning'
        })
      });
      this.results.push(result);
    }

    // Teste de listagem
    for (let i = 0; i < 3; i++) {
      const result = await this.runTest('/parking-sensor-data', 'GET', undefined, {
        page: i + 1,
        pageSize: 10
      });
      this.results.push(result);
    }

    // Teste de dados por sensor de estacionamento
    for (const parkingSensorId of this.parkingSensorIds) {
      const result = await this.runTest(`/parking-sensor-data/parking-sensor/${parkingSensorId}`, 'GET');
      this.results.push(result);
    }
  }

  async runAllTests() {
    await this.initialize();

    await this.testContactMessages();
    await this.testParkings();
    await this.testParkingSlots();
    await this.testSensors();
    await this.testParkingSensors();
    await this.testSensorsData();
    await this.testParkingSensorData();

    this.printResults();
  }

  printResults() {
    console.log('\n📊 RESULTADOS DOS TESTES DE STRESS');
    console.log('=====================================');

    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successfulTests;

    console.log(`Total de testes: ${totalTests}`);
    console.log(`Testes bem-sucedidos: ${successfulTests}`);
    console.log(`Testes falharam: ${failedTests}`);
    console.log(`Taxa de sucesso: ${((successfulTests / totalTests) * 100).toFixed(2)}%`);

    // Estatísticas de tempo
    const durations = this.results.map(r => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);

    console.log(`\n⏱️  Estatísticas de Tempo:`);
    console.log(`Tempo médio: ${avgDuration.toFixed(2)}ms`);
    console.log(`Tempo mínimo: ${minDuration}ms`);
    console.log(`Tempo máximo: ${maxDuration}ms`);

    // Agrupar por endpoint
    const endpointStats = this.results.reduce((acc, result) => {
      const key = `${result.method} ${result.endpoint}`;
      if (!acc[key]) {
        acc[key] = { count: 0, success: 0, totalDuration: 0 };
      }
      acc[key].count++;
      acc[key].totalDuration += result.duration;
      if (result.success) acc[key].success++;
      return acc;
    }, {} as any);

    console.log(`\n📋 Detalhes por Endpoint:`);
    Object.entries(endpointStats).forEach(([endpoint, stats]: [string, any]) => {
      const successRate = ((stats.success / stats.count) * 100).toFixed(2);
      const avgTime = (stats.totalDuration / stats.count).toFixed(2);
      console.log(`${endpoint}:`);
      console.log(`  - Testes: ${stats.count}, Sucesso: ${stats.success} (${successRate}%)`);
      console.log(`  - Tempo médio: ${avgTime}ms`);
    });

    // Mostrar falhas
    const failures = this.results.filter(r => !r.success);
    if (failures.length > 0) {
      console.log(`\n❌ Falhas detectadas:`);
      failures.forEach(failure => {
        console.log(`  ${failure.method} ${failure.endpoint} - Status: ${failure.status}, Tempo: ${failure.duration}ms`);
      });
    }

    console.log('\n✅ Testes de stress concluídos!');
  }
}

// Executar testes
async function main() {
  const stressTest = new StressTest();
  await stressTest.runAllTests();
}

main()
  .catch((e) => {
    console.error('❌ Erro durante os testes de stress:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

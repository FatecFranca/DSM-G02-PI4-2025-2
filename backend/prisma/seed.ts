import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    try {
        // Limpar dados existentes (em ordem reversa para evitar problemas de foreign key)
        console.log('🧹 Limpando dados existentes...');

        // Primeiro, verificar se as tabelas existem antes de tentar deletar
        try {
            await prisma.parkingSensorData.deleteMany();
            console.log('✅ ParkingSensorData limpo');
        } catch (error) {
            console.log('⚠️ ParkingSensorData não existe ainda');
        }

        try {
            await prisma.sensorsData.deleteMany();
            console.log('✅ SensorsData limpo');
        } catch (error) {
            console.log('⚠️ SensorsData não existe ainda');
        }

        try {
            await prisma.parkingSensor.deleteMany();
            console.log('✅ ParkingSensor limpo');
        } catch (error) {
            console.log('⚠️ ParkingSensor não existe ainda');
        }

        try {
            await prisma.sensors.deleteMany();
            console.log('✅ Sensors limpo');
        } catch (error) {
            console.log('⚠️ Sensors não existe ainda');
        }

        try {
            await prisma.parkingSlot.deleteMany();
            console.log('✅ ParkingSlot limpo');
        } catch (error) {
            console.log('⚠️ ParkingSlot não existe ainda');
        }

        try {
            await prisma.parking.deleteMany();
            console.log('✅ Parking limpo');
        } catch (error) {
            console.log('⚠️ Parking não existe ainda');
        }

        try {
            await prisma.contactMessage.deleteMany();
            console.log('✅ ContactMessage limpo');
        } catch (error) {
            console.log('⚠️ ContactMessage não existe ainda');
        }

        // Criar estacionamentos
        console.log('🏢 Criando estacionamentos...');
        const parking1 = await prisma.parking.create({
            data: {
                name: 'Shopping Center Parking',
                address: 'Rua das Flores, 123',
                country: 'Brasil',
                state: 'SP',
                city: 'São Paulo',
                number: '123',
                phone: '(11) 99999-9999',
                description: 'Estacionamento do shopping center com 200 vagas',
                isActive: true
            }
        });

        const parking2 = await prisma.parking.create({
            data: {
                name: 'Estacionamento Centro',
                address: 'Av. Paulista, 1000',
                country: 'Brasil',
                state: 'SP',
                city: 'São Paulo',
                number: '1000',
                phone: '(11) 88888-8888',
                description: 'Estacionamento no centro da cidade',
                isActive: true
            }
        });

        const parking3 = await prisma.parking.create({
            data: {
                name: 'Parking Aeroporto',
                address: 'Rodovia dos Bandeirantes, 500',
                country: 'Brasil',
                state: 'SP',
                city: 'Guarulhos',
                number: '500',
                phone: '(11) 77777-7777',
                description: 'Estacionamento do aeroporto internacional',
                isActive: true
            }
        });

        console.log(`✅ Estacionamentos criados: ${parking1.name}, ${parking2.name}, ${parking3.name}`);

        // Criar vagas de estacionamento
        console.log('🅿️ Criando vagas de estacionamento...');
        const parkingSlots1: any[] = [];
        for (let i = 1; i <= 50; i++) {
            parkingSlots1.push(
                await prisma.parkingSlot.create({
                    data: {
                        parkingId: parking1.id,
                        number: i,
                        isAvailable: Math.random() > 0.3, // 70% disponível
                        isActive: true
                    }
                })
            );
        }

        const parkingSlots2: any[] = [];
        for (let i = 1; i <= 30; i++) {
            parkingSlots2.push(
                await prisma.parkingSlot.create({
                    data: {
                        parkingId: parking2.id,
                        number: i,
                        isAvailable: Math.random() > 0.4, // 60% disponível
                        isActive: true
                    }
                })
            );
        }

        const parkingSlots3: any[] = [];
        for (let i = 1; i <= 100; i++) {
            parkingSlots3.push(
                await prisma.parkingSlot.create({
                    data: {
                        parkingId: parking3.id,
                        number: i,
                        isAvailable: Math.random() > 0.2, // 80% disponível
                        isActive: true
                    }
                })
            );
        }

        console.log(`✅ Vagas criadas: ${parkingSlots1.length + parkingSlots2.length + parkingSlots3.length} total`);

            // Criar sensores para vagas
    console.log('📡 Criando sensores para vagas...');
    const sensors: any[] = [];
    const sensorTypes = ['IR', 'ULTRASONIC', 'RFID', 'CAMERA'] as const;
    
    // Sensores para parking1
    for (let i = 0; i < 20; i++) {
      sensors.push(
        await prisma.sensors.create({
          data: {
            parkingSlotId: parkingSlots1[i].id,
            name: `Sensor Vaga ${parkingSlots1[i].number}`,
            description: `Sensor para monitorar vaga ${parkingSlots1[i].number}`,
            type: sensorTypes[Math.floor(Math.random() * sensorTypes.length)] as any,
            isActive: true
          }
        })
      );
    }

    // Sensores para parking2
    for (let i = 0; i < 15; i++) {
      sensors.push(
        await prisma.sensors.create({
          data: {
            parkingSlotId: parkingSlots2[i].id,
            name: `Sensor Centro ${parkingSlots2[i].number}`,
            description: `Sensor para monitorar vaga ${parkingSlots2[i].number}`,
            type: sensorTypes[Math.floor(Math.random() * sensorTypes.length)] as any,
            isActive: true
          }
        })
      );
    }

    // Sensores para parking3
    for (let i = 0; i < 40; i++) {
      sensors.push(
        await prisma.sensors.create({
          data: {
            parkingSlotId: parkingSlots3[i].id,
            name: `Sensor Aeroporto ${parkingSlots3[i].number}`,
            description: `Sensor para monitorar vaga ${parkingSlots3[i].number}`,
            type: sensorTypes[Math.floor(Math.random() * sensorTypes.length)] as any,
            isActive: true
          }
        })
      );
    }

    console.log(`✅ Sensores criados: ${sensors.length} total`);

    // Criar sensores de estacionamento
    console.log('🌡️ Criando sensores de estacionamento...');
    const parkingSensors: any[] = [];
    const parkingSensorTypes = ['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS'] as const;

        // Sensores para parking1
        for (let i = 0; i < 5; i++) {
            parkingSensors.push(
                await prisma.parkingSensor.create({
                    data: {
                        parkingId: parking1.id,
                        name: `Sensor Ambiental ${i + 1}`,
                        description: `Sensor ambiental ${parkingSensorTypes[i]} para ${parking1.name}`,
                        type: parkingSensorTypes[i] as any,
                        isActive: true
                    }
                })
            );
        }

        // Sensores para parking2
        for (let i = 0; i < 3; i++) {
            parkingSensors.push(
                await prisma.parkingSensor.create({
                    data: {
                        parkingId: parking2.id,
                        name: `Sensor Centro ${i + 1}`,
                        description: `Sensor ambiental ${parkingSensorTypes[i]} para ${parking2.name}`,
                        type: parkingSensorTypes[i] as any,
                        isActive: true
                    }
                })
            );
        }

        // Sensores para parking3
        for (let i = 0; i < 8; i++) {
            parkingSensors.push(
                await prisma.parkingSensor.create({
                    data: {
                        parkingId: parking3.id,
                        name: `Sensor Aeroporto ${i + 1}`,
                        description: `Sensor ambiental ${parkingSensorTypes[i]} para ${parking3.name}`,
                        type: parkingSensorTypes[i] as any,
                        isActive: true
                    }
                })
            );
        }

        console.log(`✅ Sensores de estacionamento criados: ${parkingSensors.length} total`);

        // Criar dados de sensores
        console.log('📊 Criando dados de sensores...');
        let sensorsDataCount = 0;
        for (const sensor of sensors) {
            // Criar 5-10 registros de dados por sensor
            const numRecords = Math.floor(Math.random() * 6) + 5;
            for (let i = 0; i < numRecords; i++) {
                await prisma.sensorsData.create({
                    data: {
                        sensorId: sensor.id,
                        data: JSON.stringify({
                            timestamp: new Date(Date.now() - Math.random() * 86400000), // Últimos 24h
                            value: Math.random() * 100,
                            status: Math.random() > 0.1 ? 'active' : 'error',
                            battery: Math.random() * 100
                        }),
                        isActive: true
                    }
                });
                sensorsDataCount++;
            }
        }

        console.log(`✅ Dados de sensores criados: ${sensorsDataCount} registros`);

        // Criar dados de sensores de estacionamento
        console.log('📈 Criando dados de sensores de estacionamento...');
        let parkingSensorDataCount = 0;
        for (const parkingSensor of parkingSensors) {
            // Criar 10-20 registros de dados por sensor
            const numRecords = Math.floor(Math.random() * 11) + 10;
            for (let i = 0; i < numRecords; i++) {
                await prisma.parkingSensorData.create({
                    data: {
                        parkingSensorId: parkingSensor.id,
                        data: JSON.stringify({
                            timestamp: new Date(Date.now() - Math.random() * 86400000), // Últimos 24h
                            value: Math.random() * 100,
                            unit: getUnitForSensorType(parkingSensor.type),
                            status: Math.random() > 0.05 ? 'normal' : 'warning'
                        })
                    }
                });
                parkingSensorDataCount++;
            }
        }

        console.log(`✅ Dados de sensores de estacionamento criados: ${parkingSensorDataCount} registros`);

        // Criar mensagens de contato
        console.log('💬 Criando mensagens de contato...');
        const contactMessages = [
            {
                name: 'João Silva',
                email: 'joao.silva@email.com',
                message: 'Gostaria de saber mais sobre os horários de funcionamento do estacionamento.'
            },
            {
                name: 'Maria Santos',
                email: 'maria.santos@email.com',
                message: 'Preciso de informações sobre preços e formas de pagamento.'
            },
            {
                name: 'Pedro Costa',
                email: 'pedro.costa@email.com',
                message: 'Há vagas disponíveis para motos no estacionamento?'
            },
            {
                name: 'Ana Oliveira',
                email: 'ana.oliveira@email.com',
                message: 'Gostaria de fazer uma reserva para o próximo fim de semana.'
            },
            {
                name: 'Carlos Ferreira',
                email: 'carlos.ferreira@email.com',
                message: 'O estacionamento possui sistema de segurança 24h?'
            }
        ];

        for (const message of contactMessages) {
            await prisma.contactMessage.create({
                data: message
            });
        }

        console.log(`✅ Mensagens de contato criadas: ${contactMessages.length}`);

        console.log('✅ Seed concluído com sucesso!');
        console.log(`📊 Resumo dos dados criados:`);
        console.log(`   - Estacionamentos: 3`);
        console.log(`   - Vagas: ${parkingSlots1.length + parkingSlots2.length + parkingSlots3.length}`);
        console.log(`   - Sensores de vaga: ${sensors.length}`);
        console.log(`   - Sensores de estacionamento: ${parkingSensors.length}`);
        console.log(`   - Dados de sensores: ${sensorsDataCount} registros`);
        console.log(`   - Dados de sensores de estacionamento: ${parkingSensorDataCount} registros`);
        console.log(`   - Mensagens de contato: ${contactMessages.length}`);

    } catch (error) {
        console.error('❌ Erro durante o seed:', error);
        throw error;
    }
}

function getUnitForSensorType(type: string): string {
    const units: { [key: string]: string } = {
        'TEMPERATURE': '°C',
        'HUMIDITY': '%',
        'LIGHT': 'lux',
        'PRESSURE': 'hPa',
        'SOUND': 'dB',
        'VIBRATION': 'm/s²',
        'MOTION': 'detected',
        'GAS': 'ppm'
    };
    return units[type] || 'unit';
}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

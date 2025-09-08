import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Parking API',
      version: '1.0.0',
      description: 'API para sistema de estacionamento inteligente',
      contact: {
        name: 'Smart Parking Team',
        email: 'contato@smartparking.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        ContactMessage: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            message: { type: 'string', example: 'Mensagem de contato' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Parking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Estacionamento Centro' },
            address: { type: 'string', example: 'Rua das Flores' },
            country: { type: 'string', example: 'Brasil' },
            state: { type: 'string', example: 'SP' },
            city: { type: 'string', example: 'São Paulo' },
            number: { type: 'string', example: '123' },
            phone: { type: 'string', example: '(11) 99999-9999' },
            description: { type: 'string', example: 'Estacionamento no centro da cidade' },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        ParkingSlot: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            parkingId: { type: 'string', format: 'uuid' },
            isAvailable: { type: 'boolean', default: true },
            isActive: { type: 'boolean', default: true },
            number: { type: 'integer', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Sensors: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            parkingSlotId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            name: { type: 'string', example: 'Sensor IR 001' },
            description: { type: 'string', example: 'Sensor infravermelho para detecção de presença' },
            type: { 
              type: 'string', 
              enum: ['IR', 'ULTRASONIC', 'RFID', 'CAMERA'],
              example: 'IR'
            }
          }
        },
        ParkingSensor: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            parkingId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            name: { type: 'string', example: 'Sensor de Temperatura 001' },
            description: { type: 'string', example: 'Sensor de temperatura do estacionamento' },
            type: { 
              type: 'string', 
              enum: ['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS'],
              example: 'TEMPERATURE'
            }
          }
        },
        ParkingSensorData: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            parkingSensorId: { type: 'string', format: 'uuid' },
            data: { type: 'string', example: '25.5' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        SensorsData: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            sensorId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' },
            data: { type: 'string', example: 'PRESENT' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Erro interno do servidor' },
            status: { type: 'integer', example: 500 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const specs = swaggerJsdoc(options);

# Documentação Swagger - Smart Parking API

## Visão Geral

A API do Smart Parking possui documentação completa através do Swagger UI, que permite testar e explorar todos os endpoints disponíveis.

## Como Acessar

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

2. **Acesse a documentação Swagger:**
   - URL: `http://localhost:4000/api-docs`
   - O Swagger UI será carregado automaticamente

## Estrutura da API

### 1. Contact Messages (Mensagens de Contato)
- **Base URL:** `/contact-messages`
- **Operações:** CRUD completo para mensagens de contato
- **Campos:** name, email, message

### 2. Parkings (Estacionamentos)
- **Base URL:** `/parkings`
- **Operações:** CRUD completo para estacionamentos
- **Endpoints especiais:**
  - `GET /parkings/active` - Lista estacionamentos ativos
- **Campos:** name, address, country, state, city, number, phone, description, isActive

### 3. Parking Slots (Vagas de Estacionamento)
- **Base URL:** `/parking-slots`
- **Operações:** CRUD completo para vagas
- **Endpoints especiais:**
  - `GET /parking-slots/available` - Lista vagas disponíveis
  - `GET /parking-slots/parking/{parkingId}` - Vagas por estacionamento
- **Campos:** parkingId, number, isAvailable, isActive

### 4. Sensors (Sensores)
- **Base URL:** `/sensors`
- **Operações:** CRUD completo para sensores
- **Endpoints especiais:**
  - `GET /sensors/active` - Lista sensores ativos
  - `GET /sensors/type/{type}` - Sensores por tipo (IR, ULTRASONIC, RFID, CAMERA)
  - `GET /sensors/parking-slot/{parkingSlotId}` - Sensores por vaga
- **Campos:** parkingSlotId, name, description, type, isActive

### 5. Parking Sensors (Sensores de Estacionamento)
- **Base URL:** `/parking-sensors`
- **Operações:** CRUD completo para sensores de estacionamento
- **Endpoints especiais:**
  - `GET /parking-sensors/active` - Lista sensores ativos
  - `GET /parking-sensors/type/{type}` - Sensores por tipo (TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION, GAS)
  - `GET /parking-sensors/parking/{parkingId}` - Sensores por estacionamento
- **Campos:** parkingId, name, description, type, isActive

### 6. Sensors Data (Dados dos Sensores)
- **Base URL:** `/sensors-data`
- **Operações:** CRUD completo para dados de sensores
- **Endpoints especiais:**
  - `GET /sensors-data/active` - Lista dados ativos
  - `GET /sensors-data/sensor/{sensorId}` - Dados por sensor
  - `GET /sensors-data/parking-slot/{parkingSlotId}` - Dados por vaga
- **Campos:** sensorId, data, isActive

### 7. Parking Sensor Data (Dados dos Sensores de Estacionamento)
- **Base URL:** `/parking-sensor-data`
- **Operações:** CRUD completo para dados de sensores de estacionamento
- **Endpoints especiais:**
  - `GET /parking-sensor-data/parking-sensor/{parkingSensorId}` - Dados por sensor de estacionamento
  - `GET /parking-sensor-data/parking/{parkingId}` - Dados por estacionamento
- **Campos:** parkingSensorId, data

## Tipos de Dados

### Enums

#### SensorType
- `IR` - Sensor infravermelho
- `ULTRASONIC` - Sensor ultrassônico
- `RFID` - Sensor RFID
- `CAMERA` - Sensor de câmera

#### SensorParkingType
- `TEMPERATURE` - Sensor de temperatura
- `HUMIDITY` - Sensor de umidade
- `LIGHT` - Sensor de luz
- `PRESSURE` - Sensor de pressão
- `SOUND` - Sensor de som
- `VIBRATION` - Sensor de vibração
- `MOTION` - Sensor de movimento
- `GAS` - Sensor de gás

## Códigos de Resposta

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## Exemplos de Uso

### Criar um Estacionamento
```json
POST /parkings
{
  "name": "Estacionamento Centro",
  "address": "Rua das Flores",
  "country": "Brasil",
  "state": "SP",
  "city": "São Paulo",
  "number": "123",
  "phone": "(11) 99999-9999",
  "description": "Estacionamento no centro da cidade"
}
```

### Criar uma Vaga
```json
POST /parking-slots
{
  "parkingId": "123e4567-e89b-12d3-a456-426614174000",
  "number": 1,
  "isAvailable": true
}
```

### Criar um Sensor
```json
POST /sensors
{
  "parkingSlotId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Sensor IR 001",
  "description": "Sensor infravermelho para detecção de presença",
  "type": "IR"
}
```

## Testando a API

1. **Acesse o Swagger UI** em `http://localhost:4000/api-docs`
2. **Explore os endpoints** clicando em cada operação
3. **Teste as requisições** usando o botão "Try it out"
4. **Veja os exemplos** de request/response para cada endpoint
5. **Execute as operações** diretamente pela interface

## Benefícios do Swagger

- **Documentação interativa** - Teste endpoints diretamente
- **Esquemas automáticos** - Validação de dados
- **Exemplos práticos** - Facilita o entendimento
- **Códigos de resposta** - Documentação completa de erros
- **Interface intuitiva** - Fácil navegação e uso

## Suporte

Para dúvidas sobre a API ou documentação, consulte:
- O código fonte dos controllers
- Os middlewares de validação
- Os schemas do Prisma
- Esta documentação

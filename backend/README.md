# 🚗 Smart Parking Backend

Sistema de backend para gerenciamento de estacionamentos inteligentes com monitoramento de sensores em tempo real.

## 🎯 Sobre o Projeto

O Smart Parking Backend é uma API RESTful desenvolvida em Node.js com TypeScript que gerencia estacionamentos inteligentes. O sistema permite:

- **Gestão de Estacionamentos**: Cadastro e gerenciamento de múltiplos estacionamentos
- **Controle de Vagas**: Monitoramento de disponibilidade de vagas em tempo real
- **Sensores Inteligentes**: Sistema de sensores para detectar ocupação de vagas
- **Sensores Ambientais**: Monitoramento de condições ambientais (temperatura, umidade, etc.)
- **Coleta de Dados**: Armazenamento e análise de dados dos sensores
- **Comunicação**: Sistema de mensagens de contato

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Joi** - Validação de dados
- **Jest** - Framework de testes

## 📁 Estrutura do Projeto

```
smart-parking-backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts               # Dados de teste
│   └── stress.ts             # Testes de stress
├── src/
│   ├── controllers/          # Controladores da API
│   ├── services/            # Lógica de negócio
│   ├── routes/              # Definição de rotas
│   ├── middlewares/         # Middlewares personalizados
│   ├── validations/         # Schemas de validação
│   ├── utils/               # Utilitários
│   └── server.ts            # Servidor principal
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd smart-parking-backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```

4. **Configure o banco de dados**
   ```bash
   # Execute as migrações
   npx prisma migrate dev
   
   # Gere o cliente Prisma
   npx prisma generate
   ```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/smart_parking"

# Servidor
PORT=8080
NODE_ENV=development

# Outras configurações
JWT_SECRET=sua_chave_secreta_aqui
```

### Banco de Dados

O projeto utiliza PostgreSQL. Certifique-se de:

1. Ter o PostgreSQL instalado e rodando
2. Criar um banco de dados chamado `smart_parking`
3. Configurar a URL de conexão no arquivo `.env`

## 🏃‍♂️ Uso

### Desenvolvimento

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev

# Ou
npm start
```

### Produção

```bash
# Build do projeto
npm run build

# Iniciar em produção
npm run start:prod
```

### Seed de Dados

```bash
# Executar seed para criar dados de teste
npx prisma db seed
```

### Testes de Stress

```bash
# Executar testes de stress (requer servidor rodando)
npx ts-node prisma/stress.ts
```

## 📡 API Endpoints

### Contact Messages
- `POST /contact-messages` - Criar mensagem de contato
- `GET /contact-messages` - Listar mensagens (com paginação)
- `GET /contact-messages/:id` - Buscar mensagem específica
- `PUT /contact-messages/:id` - Atualizar mensagem
- `DELETE /contact-messages/:id` - Deletar mensagem

### Parkings
- `POST /parkings` - Criar estacionamento
- `GET /parkings` - Listar estacionamentos (com paginação)
- `GET /parkings/active` - Listar estacionamentos ativos
- `GET /parkings/:id` - Buscar estacionamento específico
- `PUT /parkings/:id` - Atualizar estacionamento
- `DELETE /parkings/:id` - Deletar estacionamento

### Parking Slots
- `POST /parking-slots` - Criar vaga de estacionamento
- `GET /parking-slots` - Listar vagas (com paginação)
- `GET /parking-slots/available` - Listar vagas disponíveis
- `GET /parking-slots/parking/:parkingId` - Listar vagas de um estacionamento
- `GET /parking-slots/:id` - Buscar vaga específica
- `PUT /parking-slots/:id` - Atualizar vaga
- `DELETE /parking-slots/:id` - Deletar vaga

### Sensors
- `POST /sensors` - Criar sensor
- `GET /sensors` - Listar sensores (com paginação)
- `GET /sensors/active` - Listar sensores ativos
- `GET /sensors/type/:type` - Listar sensores por tipo
- `GET /sensors/parking-slot/:parkingSlotId` - Listar sensores de uma vaga
- `GET /sensors/:id` - Buscar sensor específico
- `PUT /sensors/:id` - Atualizar sensor
- `DELETE /sensors/:id` - Deletar sensor

### Parking Sensors
- `POST /parking-sensors` - Criar sensor de estacionamento
- `GET /parking-sensors` - Listar sensores (com paginação)
- `GET /parking-sensors/active` - Listar sensores ativos
- `GET /parking-sensors/type/:type` - Listar sensores por tipo
- `GET /parking-sensors/parking/:parkingId` - Listar sensores de um estacionamento
- `GET /parking-sensors/:id` - Buscar sensor específico
- `PUT /parking-sensors/:id` - Atualizar sensor
- `DELETE /parking-sensors/:id` - Deletar sensor

### Sensors Data
- `POST /sensors-data` - Criar dados de sensor
- `GET /sensors-data` - Listar dados (com paginação)
- `GET /sensors-data/active` - Listar dados de sensores ativos
- `GET /sensors-data/sensor/:sensorId` - Listar dados de um sensor
- `GET /sensors-data/parking-slot/:parkingSlotId` - Listar dados de uma vaga
- `GET /sensors-data/:id` - Buscar dados específicos
- `PUT /sensors-data/:id` - Atualizar dados
- `DELETE /sensors-data/:id` - Deletar dados

### Parking Sensor Data
- `POST /parking-sensor-data` - Criar dados de sensor de estacionamento
- `GET /parking-sensor-data` - Listar dados (com paginação)
- `GET /parking-sensor-data/parking-sensor/:parkingSensorId` - Listar dados de um sensor
- `GET /parking-sensor-data/parking/:parkingId` - Listar dados de um estacionamento
- `GET /parking-sensor-data/:id` - Buscar dados específicos
- `PUT /parking-sensor-data/:id` - Atualizar dados
- `DELETE /parking-sensor-data/:id` - Deletar dados

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### Testes de Stress

O projeto inclui um script de stress test que testa todos os endpoints da API:

```bash
# Certifique-se de que o servidor está rodando
npm start

# Em outro terminal, execute os testes de stress
npx ts-node prisma/stress.ts
```

O stress test irá:
- Testar todos os endpoints da API
- Medir tempos de resposta
- Verificar taxas de sucesso
- Gerar relatório detalhado

## 📊 Modelos de Dados

### ContactMessage
- `id` - Identificador único
- `name` - Nome do contato
- `email` - Email do contato
- `message` - Mensagem
- `createdAt` - Data de criação

### Parking
- `id` - Identificador único
- `name` - Nome do estacionamento
- `address` - Endereço
- `country` - País
- `state` - Estado
- `city` - Cidade
- `number` - Número
- `phone` - Telefone
- `description` - Descrição (opcional)
- `isActive` - Status ativo
- `createdAt` - Data de criação

### ParkingSlot
- `id` - Identificador único
- `parkingId` - ID do estacionamento
- `number` - Número da vaga
- `isAvailable` - Disponibilidade
- `isActive` - Status ativo
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Sensors
- `id` - Identificador único
- `parkingSlotId` - ID da vaga
- `name` - Nome do sensor
- `description` - Descrição (opcional)
- `type` - Tipo do sensor (IR, ULTRASONIC, RFID, CAMERA)
- `isActive` - Status ativo
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### ParkingSensor
- `id` - Identificador único
- `parkingId` - ID do estacionamento
- `name` - Nome do sensor
- `description` - Descrição (opcional)
- `type` - Tipo do sensor (TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION, GAS)
- `isActive` - Status ativo
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### SensorsData
- `id` - Identificador único
- `sensorId` - ID do sensor
- `data` - Dados do sensor (JSON)
- `isActive` - Status ativo
- `createdAt` - Data de criação

### ParkingSensorData
- `id` - Identificador único
- `parkingSensorId` - ID do sensor de estacionamento
- `data` - Dados do sensor (JSON)
- `createdAt` - Data de criação

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build do projeto
npm run start        # Iniciar servidor
npm run start:prod   # Iniciar em produção

# Testes
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com coverage

# Banco de dados
npx prisma migrate dev    # Executar migrações
npx prisma generate      # Gerar cliente Prisma
npx prisma db seed       # Executar seed
npx prisma studio        # Abrir Prisma Studio

# Stress test
npx ts-node prisma/stress.ts  # Executar testes de stress
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para o futuro dos estacionamentos inteligentes**

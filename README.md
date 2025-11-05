# 🚗 Smart Parking - Sistema Inteligente de Estacionamento

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white" alt="Arduino" />
</div>

<div align="center">
  <h3>🎓 Projeto Integrador - FATEC DSM</h3>
  <p><strong>Grupo:</strong> DSM-G02 | <strong>Semestre:</strong> 4° | <strong>Ano:</strong> 2025-2</p>
</div>

---

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [⚙️ Configuração e Instalação](#️-configuração-e-instalação)
- [🚀 Executando o Sistema](#-executando-o-sistema)
- [📊 API Documentation](#-api-documentation)
- [🔧 Hardware IoT](#-hardware-iot)
- [📱 Screenshots](#-screenshots)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Smart Parking** é um sistema completo de gerenciamento inteligente de estacionamentos que integra **tecnologia IoT**, **aplicações mobile**, **painel web administrativo** e **backend robusto** para oferecer uma solução moderna e eficiente para o mercado de estacionamentos.

### 🎯 **Objetivos do Projeto**

- **Automatizar** o controle de vagas através de sensores IoT
- **Otimizar** a experiência do usuário com reservas antecipadas
- **Fornecer** ferramentas administrativas completas
- **Integrar** múltiplas plataformas (mobile, web, hardware)
- **Implementar** monitoramento em tempo real

### 🌟 **Diferenciais**

- **Tecnologia IoT** com sensores Arduino
- **Interface multiplataforma** (mobile + web)
- **Monitoramento em tempo real**
- **Sistema de reservas inteligente**
- **Analytics avançados**
- **Integração completa** entre hardware e software

---

## 🏗️ Arquitetura do Sistema

```mermaid
graph TB
    subgraph "👥 Usuários"
        U1[👤 Cliente Mobile]
        U2[👨‍💼 Administrador Web]
    end
    
    subgraph "📱 Frontend"
        M[📱 App Mobile<br/>React Native + Expo]
        W[🌐 Web Admin<br/>Next.js + Tailwind]
    end
    
    subgraph "⚙️ Backend"
        API[🔧 API REST<br/>Node.js + Express]
        DB[(🗄️ PostgreSQL<br/>Prisma ORM)]
    end
    
    subgraph "🔌 Hardware IoT"
        S[📡 Sensores Arduino<br/>IR + Servo + WiFi]
        H[🏢 Hardware<br/>Estacionamento]
    end
    
    U1 --> M
    U2 --> W
    M --> API
    W --> API
    API --> DB
    S --> API
    S --> H
    
    style M fill:#61DAFB
    style W fill:#000000,color:#ffffff
    style API fill:#339933,color:#ffffff
    style DB fill:#316192,color:#ffffff
    style S fill:#00979D,color:#ffffff
```

### 🔄 **Fluxo de Dados**

1. **Sensores IoT** detectam ocupação das vagas
2. **Dados** são enviados via WiFi para a API
3. **API** processa e armazena no banco PostgreSQL
4. **Apps** (mobile/web) consomem dados em tempo real
5. **Usuários** visualizam disponibilidade e fazem reservas

---

## 🛠️ Stack Tecnológico

### 📱 **Mobile App (React Native)**
```typescript
// Principais tecnologias
- React Native 0.79.5
- Expo SDK 53
- TypeScript 5.8.3
- React Navigation 7.x
- AsyncStorage 2.2.0
- Vector Icons 14.1.0
```

### 🌐 **Web Admin (Next.js)**
```typescript
// Principais tecnologias
- Next.js 14.2.5
- React 18
- TypeScript 5.5.4
- Tailwind CSS 3.4.1
- Chart.js 4.4.9
- React Hook Form 7.58.1
```

### ⚙️ **Backend API (Node.js)**
```typescript
// Principais tecnologias
- Node.js 18+
- Express.js 4.21.0
- TypeScript 5.6.2
- Prisma 5.19.1
- PostgreSQL 13+
- JWT Authentication
- Swagger Documentation
```

### 🔌 **Hardware IoT (Arduino)**
```cpp
// Principais componentes
- Arduino Uno R3
- Sensores IR (Infravermelho)
- Servo Motores
- Módulo WiFi ESP8266
- Display LCD 16x2
- Buzzer para alertas
```

---

## 📁 Estrutura do Projeto

```
DSM-G02-PI4-2025-2/
├── 📱 app/                          # Aplicativo Mobile (React Native)
│   ├── app/                         # Telas e navegação
│   ├── components/                  # Componentes reutilizáveis
│   ├── contexts/                    # Contextos React (Auth)
│   ├── lib/                         # Serviços e API
│   ├── assets/                      # Imagens e fontes
│   └── package.json
│
├── 🌐 frontend/                     # Painel Web Administrativo (Next.js)
│   ├── src/
│   │   ├── app/                     # Páginas Next.js 13+
│   │   ├── components/             # Componentes React
│   │   ├── lib/                    # Utilitários e configurações
│   │   └── types/                  # Tipos TypeScript
│   └── package.json
│
├── ⚙️ backend/                      # API Backend (Node.js)
│   ├── src/
│   │   ├── controllers/            # Controladores da API
│   │   ├── services/              # Lógica de negócio
│   │   ├── routes/                # Definição de rotas
│   │   ├── middlewares/           # Middlewares personalizados
│   │   ├── validations/           # Validação de dados
│   │   └── utils/                 # Utilitários
│   ├── prisma/                    # Schema e migrações do banco
│   └── package.json
│
├── 📊 apresentacao/                 # Documentação do projeto
│   ├── apresentacao-dsm.pdf
│   └── apresentacao-dsm.pptx
│
└── 📄 README.md                   # Este arquivo
```

---

## ✨ Funcionalidades

### 📱 **Aplicativo Mobile (React Native)**

#### 👤 **Para Clientes**
- **🗺️ Localização Inteligente**
  - Mapa com vagas disponíveis em tempo real
  - Navegação GPS até o estacionamento
  - Status atualizado via sensores IoT

- **📅 Sistema de Reservas**
  - Escolha de vaga e horário específico
  - Confirmação e cancelamento de reservas
  - Notificações push em tempo real

- **🚗 Gestão Pessoal**
  - Histórico completo de estadias
  - Tempo atual e valor a pagar
  - Perfil e configurações

- **💳 Pagamentos Integrados**
  - PIX, cartão de crédito/débito
  - Faturas e recibos digitais
  - Histórico de transações

#### 👨‍💼 **Para Administradores**
- **📊 Dashboard Executivo**
  - KPIs em tempo real
  - Gráficos de ocupação
  - Receita e métricas

- **🏢 Gestão Operacional**
  - Controle de vagas e sensores
  - Manutenção e configurações
  - Relatórios avançados

### 🌐 **Painel Web Administrativo (Next.js)**

- **📈 Analytics Avançados**
  - Dashboard com métricas detalhadas
  - Gráficos interativos (Chart.js)
  - Relatórios exportáveis (PDF/Excel)

- **⚙️ Gestão Completa**
  - CRUD de estacionamentos e vagas
  - Configuração de sensores IoT
  - Gestão de usuários e permissões

- **📊 Relatórios Inteligentes**
  - Filtros por período, vaga, cliente
  - Exportação em múltiplos formatos
  - Análise de tendências

### ⚙️ **Backend API (Node.js)**

- **🔐 Autenticação Segura**
  - JWT tokens
  - Middleware de autorização
  - Controle de acesso por roles

- **📡 Integração IoT**
  - Endpoints para sensores
  - Processamento em tempo real
  - Validação de dados

- **🗄️ Banco de Dados**
  - PostgreSQL com Prisma ORM
  - Migrações automáticas
  - Relacionamentos complexos

### 🔌 **Hardware IoT (Arduino)**

- **📡 Sensores Inteligentes**
  - Detecção IR de veículos
  - Controle de barreiras (servo)
  - Monitoramento ambiental

- **🌐 Conectividade**
  - WiFi para transmissão
  - Protocolo HTTP/REST
  - Sincronização em tempo real

---

## ⚙️ Configuração e Instalação

### 📋 **Pré-requisitos**

- **Node.js** 18+ 
- **PostgreSQL** 13+
- **Git**
- **Expo CLI** (para mobile)
- **Arduino IDE** (para hardware)

### 🔧 **Variáveis de Ambiente**

Crie um arquivo `.env` na pasta `backend/`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/smartparking"

# JWT
JWT_SECRET="seu_jwt_secret_super_seguro"

# Server
PORT=4000
NODE_ENV=development

# AWS S3 (opcional)
AWS_ACCESS_KEY_ID="sua_access_key"
AWS_SECRET_ACCESS_KEY="sua_secret_key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="seu_bucket"
```

---

## 🚀 Executando o Sistema

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/smart-parking.git
cd smart-parking
```

### 2️⃣ **Configuração do Banco de Dados**

```bash
# Instalar PostgreSQL e criar banco
createdb smartparking

# Configurar variáveis de ambiente
cp backend/.env.example backend/.env
# Editar o arquivo .env com suas configurações
```

### 3️⃣ **Backend API**

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

**✅ Backend rodando em:** `http://localhost:4000`
**📚 Swagger UI:** `http://localhost:4000/api-docs`

### 4️⃣ **Frontend Web**

```bash
cd frontend
npm install
npm run dev
```

**✅ Web Admin rodando em:** `http://localhost:3000`

### 5️⃣ **App Mobile**

```bash
cd app
npm install
npx expo start
```

**📱 Opções de execução:**
- **Android:** `npx expo start --android`
- **iOS:** `npx expo start --ios`
- **Web:** `npx expo start --web`

### 6️⃣ **Hardware IoT (Arduino)**

```cpp
// Carregar o código no Arduino IDE
// Configurar WiFi no código
// Conectar sensores conforme esquema
// Upload para Arduino Uno
```

---

## 📊 API Documentation

### 🔗 **Endpoints Principais**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Login de usuário |
| `POST` | `/auth/register` | Registro de usuário |
| `GET` | `/parkings` | Listar estacionamentos |
| `GET` | `/parking-slots` | Listar vagas |
| `POST` | `/reservations` | Criar reserva |
| `GET` | `/statistics` | Estatísticas gerais |
| `GET` | `/sensors` | Dados dos sensores |

### 📚 **Documentação Swagger**

Acesse: `http://localhost:4000/api-docs`

- **Autenticação:** JWT Bearer Token
- **Formato:** JSON
- **Testes:** Interface interativa

---

## 🔧 Hardware IoT

### 📡 **Componentes Necessários**

- **Arduino Uno R3** (1x)
- **Módulo WiFi ESP8266** (1x)
- **Sensores IR** (2x por vaga)
- **Servo Motor SG90** (1x por vaga)
- **Display LCD 16x2** (1x)
- **Buzzer** (1x)
- **Resistores e jumpers**

### 🔌 **Esquema de Conexão**

```
Arduino Uno
├── Pin 2,3 → Sensores IR
├── Pin 9 → Servo Motor
├── Pin 7,8 → Display LCD
├── Pin 10 → Buzzer
└── ESP8266 → Comunicação WiFi
```

### 💻 **Código Arduino**

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <Servo.h>

// Configurações WiFi
const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";

// Configurações API
const char* serverName = "http://localhost:4000/api/sensors";

// Sensores
int sensor1 = 2;
int sensor2 = 3;
Servo servo;

void setup() {
  Serial.begin(115200);
  servo.attach(9);
  
  // Conectar WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }
}

void loop() {
  // Ler sensores
  bool ocupado = digitalRead(sensor1) == LOW;
  
  // Enviar dados para API
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    String json = "{\"occupied\":" + String(ocupado) + "}";
    int responseCode = http.POST(json);
    
    if (responseCode > 0) {
      Serial.println("Dados enviados com sucesso!");
    }
    
    http.end();
  }
  
  delay(5000); // Enviar a cada 5 segundos
}
```

---

## 📱 Screenshots

### 🌐 **Painel Web Administrativo**

<div align="center">
  <h4>Dashboard Principal</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/1.png?raw=true" alt="Dashboard Principal" width="800" />
</div>

<div align="center">
  <h4>Gestão de Vagas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/2.png?raw=true" alt="Gestão de Vagas" width="800" />
</div>

<div align="center">
  <h4>Gestão de Reservas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/3.png?raw=true" alt="Gestão de Reservas" width="800" />
</div>

<div align="center">
  <h4>Gestão de Sensores</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/4.png?raw=true" alt="Gestão de Sensores" width="800" />
</div>

<div align="center">
  <h4>Informações de Sensores</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/5.png?raw=true" alt="Informações de Sensores" width="800" />
</div>

<div align="center">
  <h4>Gestão de Estacionamentos</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/6.png?raw=true" alt="Gestão de Estacionamentos" width="800" />
</div>

<div align="center">
  <h4>Relatórios</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/7.png?raw=true" alt="Relatórios" width="800" />
</div>

<div align="center">
  <h4>Tela de Reservas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/8.png?raw=true" alt="Tela de Reservas" width="800" />
</div>

### 📱 **App Mobile (React Native)**

<div align="center">
  <h4>9. Dashboard do App</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/9.png?raw=true" alt="Dashboard do App" width="400" />
</div>

<div align="center">
  <h4>10. Gestão de Vagas no App</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/10.png?raw=true" alt="Gestão de Vagas no App" width="400" />
</div>

<div align="center">
  <h4>11. Tela de Reservas no App</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/11.png?raw=true" alt="Tela de Reservas no App" width="400" />
</div>

<div align="center">
  <h4>12. Minhas Reservas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/12.png?raw=true" alt="Minhas Reservas" width="400" />
</div>

<div align="center">
  <h4>13. Sensores no App</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/13.png?raw=true" alt="Sensores no App" width="400" />
</div>

<div align="center">
  <h4>14. Detalhes de Sensores</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/14.png?raw=true" alt="Detalhes de Sensores" width="400" />
</div>

### 🔌 **Hardware IoT**
- **Arduino** com sensores conectados
- **Display** mostrando status
- **Servo** controlando barreira
- **WiFi** transmitindo dados

---

## 🤝 Contribuição

### 📝 **Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### 🎯 **Padrões de Desenvolvimento**

- **TypeScript** em todos os arquivos
- **ESLint** para qualidade de código
- **Commits** semânticos
- **Testes** para novas funcionalidades
- **Documentação** atualizada

### 🐛 **Reportar Bugs**

Use o sistema de **Issues** do GitHub com:
- Descrição detalhada do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do ambiente

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <h3>🎓 FATEC - Faculdade de Tecnologia de São Paulo</h3>
  <p><strong>Curso:</strong> Desenvolvimento de Software Multiplataforma (DSM)</p>
  <p><strong>Grupo:</strong> DSM-G02 | <strong>Semestre:</strong> 4° | <strong>Ano:</strong> 2025-2</p>
  
  <p>Desenvolvido com ❤️ pela equipe DSM-G02</p>
  
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version" />
</div>
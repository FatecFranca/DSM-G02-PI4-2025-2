# 🚗 Smart Parking - Sistema Inteligente de Estacionamento

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Tecnologias](#️-tecnologias)
- [⚙️ Configuração](#️-configuração)
- [🚀 Executando o Projeto](#-executando-o-projeto)
- [📱 Screenshots](#-screenshots)
- [📊 API Documentation](#-api-documentation)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 📖 Sobre o Projeto

O **Smart Parking** é um sistema completo de gerenciamento inteligente de estacionamentos que combina tecnologia IoT, aplicações mobile e web para oferecer uma experiência moderna e eficiente para usuários e administradores.

### 🎯 Objetivo

Desenvolver uma solução integrada que permita:
- **Monitoramento em tempo real** das vagas de estacionamento
- **Reserva antecipada** de vagas pelos usuários
- **Gestão administrativa** completa com relatórios e analytics
- **Integração com sensores IoT** para detecção automática de ocupação

## ✨ Funcionalidades

### 📱 **Aplicativo Mobile (React Native)**

#### 👤 **Para Usuários**
- **🔍 Localização e Disponibilidade**
  - Mapa com vagas disponíveis em tempo real
  - Visualização de distância até o estacionamento
  - Status atualizado via sensores IoT

- **📅 Reserva de Vagas**
  - Escolha de vaga e horário específico
  - Confirmação e cancelamento de reservas
  - Notificações de status da reserva

- **🚗 Meu Estacionamento**
  - Histórico completo de entradas e saídas
  - Tempo atual da estadia
  - Valor a pagar em tempo real

- **💳 Pagamentos**
  - Faturas e recibos digitais
  - Integração com PIX, cartão e outros meios
  - Histórico de transações

#### 👨‍💼 **Para Administradores**
- **📊 Dashboard Inteligente**
  - KPIs: ocupação média, tempo médio de permanência
  - Receita do dia/mês em tempo real
  - Mapa visual dos estacionamentos (verde = livre, vermelho = ocupada)

- **🏢 Gestão de Vagas**
  - Lista completa com ID e localização
  - Status: ocupada, livre, reservada, manutenção
  - Alteração manual de status
  - Monitoramento via sensores IoT

- **👥 Gestão de Clientes**
  - CRUD completo de clientes
  - Cadastro de placas de veículos
  - Histórico de uso por cliente

- **📈 Relatórios e Analytics**
  - Filtros por vaga, cliente e período
  - Exportação em PDF/Excel
  - Gráficos de ocupação e receita

### 🌐 **Painel Web Administrativo (Next.js)**

- **Interface moderna** com Tailwind CSS
- **Dashboard completo** com métricas em tempo real
- **Gestão de estacionamentos** e vagas
- **Relatórios avançados** com gráficos interativos
- **Configurações** de tarifas e sensores

### 🔧 **Backend API (Node.js + Express)**

- **RESTful API** completa com TypeScript
- **Autenticação JWT** segura
- **Documentação Swagger** automática
- **Integração com banco PostgreSQL**
- **Middleware de validação** com Joi
- **Sistema de cache** para performance

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Web Admin     │    │   IoT Sensors   │
│  (React Native) │    │   (Next.js)     │    │   (Hardware)    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Backend API          │
                    │    (Node.js + Express)    │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │     PostgreSQL Database   │
                    │     (Prisma ORM)         │
                    └───────────────────────────┘
```

## 🛠️ Tecnologias

### 📱 **Frontend Mobile**
- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Armazenamento local
- **Vector Icons** - Ícones personalizados

### 🌐 **Frontend Web**
- **Next.js 14** - Framework React para produção
- **Tailwind CSS** - Framework CSS utilitário
- **TypeScript** - Tipagem estática
- **Chart.js** - Gráficos e visualizações
- **React Hook Form** - Gerenciamento de formulários
- **Framer Motion** - Animações

### ⚙️ **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Swagger** - Documentação da API

### 🔧 **Ferramentas de Desenvolvimento**
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Jest** - Testes unitários
- **Git** - Controle de versão

## ⚙️ Configuração

### 📋 **Pré-requisitos**

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 13 ou superior)
- **Git**

### 🔧 **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto backend:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/smartparking"

# JWT
JWT_SECRET="seu_jwt_secret_aqui"

# Server
PORT=4000
NODE_ENV=development

# AWS S3 (opcional)
AWS_ACCESS_KEY_ID="sua_access_key"
AWS_SECRET_ACCESS_KEY="sua_secret_key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="seu_bucket"
```

## 🚀 Executando o Projeto

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/smart-parking.git
cd smart-parking
```

### 2️⃣ **Configuração do Backend**

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

### 3️⃣ **Configuração do Frontend Web**

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ **Configuração do App Mobile**

```bash
cd app
npm install
npx expo start
```

### 📱 **Executando no Dispositivo**

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

## 📱 Screenshots

### 🏠 **Dashboard Mobile**
- Visão geral dos estacionamentos
- Estatísticas em tempo real
- Gráficos de ocupação

### 📊 **Painel Administrativo**
- Métricas detalhadas
- Gestão de vagas
- Relatórios avançados

### 🔧 **Configurações**
- Gestão de usuários
- Configuração de sensores
- Tarifas e preços

## 📊 API Documentation

A documentação completa da API está disponível através do Swagger UI:

- **URL:** `http://localhost:4000/api-docs`
- **Métodos:** GET, POST, PUT, DELETE
- **Autenticação:** JWT Bearer Token
- **Formato:** JSON

### 🔗 **Endpoints Principais**

```
POST   /auth/login          # Login de usuário
POST   /auth/register       # Registro de usuário
GET    /parkings            # Listar estacionamentos
GET    /parking-slots       # Listar vagas
POST   /reservations        # Criar reserva
GET    /statistics          # Estatísticas gerais
```

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### 📝 **Padrões de Código**

- Use **TypeScript** em todos os arquivos
- Siga as convenções do **ESLint**
- Escreva **testes** para novas funcionalidades
- Documente **APIs** com JSDoc

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe DSM-G02</p>
  <p>FATEC - Faculdade de Tecnologia de São Paulo</p>
</div>
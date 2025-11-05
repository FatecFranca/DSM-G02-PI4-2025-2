# 🌐 Smart Parking Frontend

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js" />
</div>

<div align="center">
  <h3>🎓 Painel Web Administrativo - FATEC DSM</h3>
  <p><strong>Grupo:</strong> DSM-G02 | <strong>Semestre:</strong> 4° | <strong>Ano:</strong> 2025-2</p>
</div>

---

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [⚙️ Configuração e Instalação](#️-configuração-e-instalação)
- [🚀 Executando o Projeto](#-executando-o-projeto)
- [🎨 Componentes Principais](#-componentes-principais)
- [📊 Páginas e Rotas](#-páginas-e-rotas)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [📱 Responsividade](#-responsividade)
- [🔐 Autenticação](#-autenticação)
- [🎯 Funcionalidades Avançadas](#-funcionalidades-avançadas)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Smart Parking Frontend** é o painel web administrativo do sistema de estacionamentos inteligentes. Desenvolvido com **Next.js 14** e **TypeScript**, oferece uma interface moderna e responsiva para gerenciamento completo do sistema.

### 🎯 **Objetivos do Frontend**

- **Interface Administrativa** completa e intuitiva
- **Dashboard** com métricas em tempo real
- **Gestão** de estacionamentos, vagas e sensores
- **Relatórios** avançados e exportáveis
- **Experiência** de usuário otimizada
- **Responsividade** total para todos os dispositivos

### 🌟 **Diferenciais**

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para design system
- **Chart.js** para visualizações
- **Context API** para estado global
- **Componentes** reutilizáveis e modulares

---

## 🛠️ Tecnologias Utilizadas

### 🚀 **Core Technologies**

```typescript
// Principais dependências
- Next.js 14.2.5          // Framework React
- React 18.3.1            // Biblioteca UI
- TypeScript 5.5.4        // Linguagem tipada
- Tailwind CSS 3.4.1      // Framework CSS
```

### 📊 **Data Visualization**

```typescript
// Visualização de dados
- Chart.js 4.4.9          // Gráficos interativos
- react-chartjs-2 5.2.0   // Wrapper React para Chart.js
```

### 🎨 **UI/UX Libraries**

```typescript
// Interface e experiência
- Lucide React 0.460.0    // Ícones modernos
- React Hook Form 7.58.1  // Gerenciamento de formulários
- React Hot Toast 2.4.1   // Notificações
```

### 🔧 **Development Tools**

```typescript
// Ferramentas de desenvolvimento
- ESLint 8.57.0           // Linting
- Prettier 3.3.3          // Formatação
- PostCSS 8.4.47          // Processamento CSS
- Autoprefixer 10.4.20    // Prefixos CSS
```

---

## 📁 Estrutura do Projeto

```
frontend/
├── 📁 public/                    # Arquivos estáticos
│   ├── 📁 assets/               # Imagens e ícones
│   └── 📁 images/               # Imagens do projeto
│
├── 📁 src/
│   ├── 📁 app/                  # App Router (Next.js 13+)
│   │   ├── 📁 admin/           # Páginas administrativas
│   │   │   ├── 📄 dashboard/   # Dashboard principal
│   │   │   ├── 📄 vagas/       # Gestão de vagas
│   │   │   ├── 📄 reservas/    # Gestão de reservas
│   │   │   ├── 📄 relatorios/  # Relatórios
│   │   │   └── 📄 sensores/    # Gestão de sensores
│   │   ├── 📁 cliente/         # Páginas do cliente
│   │   │   ├── 📄 dashboard/   # Dashboard cliente
│   │   │   └── 📄 reservas/    # Minhas reservas
│   │   ├── 📄 login/           # Página de login
│   │   ├── 📄 register/        # Página de registro
│   │   ├── 📄 reservas/        # Reservar estacionamento
│   │   ├── 📄 layout.tsx       # Layout raiz
│   │   └── 📄 globals.css      # Estilos globais
│   │
│   ├── 📁 components/          # Componentes reutilizáveis
│   │   ├── 📁 dashboard/       # Componentes do dashboard
│   │   │   ├── 📄 AlertCard.tsx
│   │   │   ├── 📄 QuickActions.tsx
│   │   │   ├── 📄 StatCard.tsx
│   │   │   └── 📄 StatisticsTable.tsx
│   │   ├── 📁 layout/          # Componentes de layout
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 ClientHeader.tsx
│   │   │   └── 📄 Footer.tsx
│   │   ├── 📁 parking/         # Componentes de estacionamento
│   │   │   └── 📄 ParkingSpot.tsx
│   │   ├── 📁 reservations/    # Componentes de reservas
│   │   │   ├── 📄 ReservationFilters.tsx
│   │   │   ├── 📄 ReservationList.tsx
│   │   │   └── 📄 ReservationStats.tsx
│   │   ├── 📁 sections/        # Seções da página
│   │   │   ├── 📄 HeroSection.tsx
│   │   │   ├── 📄 FeaturesSection.tsx
│   │   │   ├── 📄 StatsSection.tsx
│   │   │   └── 📄 AboutSection.tsx
│   │   └── 📁 ui/              # Componentes de UI
│   │       ├── 📄 Button.tsx
│   │       ├── 📄 Card.tsx
│   │       ├── 📄 Modal.tsx
│   │       └── 📄 SearchInput.tsx
│   │
│   ├── 📁 context/             # Contextos React
│   │   └── 📄 AuthContext.tsx  # Contexto de autenticação
│   │
│   ├── 📁 lib/                 # Utilitários e configurações
│   │   ├── 📄 api.ts          # Cliente API
│   │   ├── 📄 auth.ts         # Utilitários de auth
│   │   └── 📄 utils.ts        # Funções utilitárias
│   │
│   └── 📁 types/               # Definições TypeScript
│       └── 📄 index.ts        # Tipos globais
│
├── 📄 package.json             # Dependências e scripts
├── 📄 tailwind.config.ts      # Configuração Tailwind
├── 📄 tsconfig.json           # Configuração TypeScript
├── 📄 next.config.mjs         # Configuração Next.js
└── 📄 README.md               # Este arquivo
```

---

## ✨ Funcionalidades

### 🏠 **Página Inicial**

- **Hero Section** com apresentação do sistema
- **Seção de Recursos** destacando funcionalidades
- **Estatísticas** em tempo real
- **Call-to-Action** para reservas
- **Design responsivo** e moderno

### 🔐 **Sistema de Autenticação**

- **Login** para clientes e administradores
- **Registro** de novos usuários
- **Context API** para gerenciamento de estado
- **Proteção de rotas** baseada em roles
- **Persistência** de sessão com localStorage

### 👨‍💼 **Painel Administrativo**

#### 📊 **Dashboard**
- **Métricas em tempo real** de ocupação
- **Gráficos interativos** com Chart.js
- **Cards de estatísticas** com KPIs
- **Tabelas** de dados recentes
- **Ações rápidas** para operações comuns

#### 🏢 **Gestão de Estacionamentos**
- **CRUD completo** de estacionamentos
- **Visualização** de vagas por estacionamento
- **Status** de disponibilidade em tempo real
- **Filtros** e busca avançada

#### 🅿️ **Gestão de Vagas**
- **Listagem** de todas as vagas
- **Status** de ocupação via sensores IoT
- **Filtros** por estacionamento e status
- **Ações** de ativação/desativação

#### 📅 **Gestão de Reservas**
- **Listagem** de todas as reservas
- **Filtros** por data, vaga e status
- **Detalhes** completos de cada reserva
- **Ações** de cancelamento e edição

#### 📈 **Relatórios**
- **Gráficos** de ocupação por período
- **Métricas** de receita e utilização
- **Exportação** em PDF/Excel
- **Filtros** avançados por período

#### 🔧 **Gestão de Sensores**
- **Monitoramento** de sensores IoT
- **Dados** em tempo real
- **Status** de conectividade
- **Configurações** de sensores

### 👤 **Área do Cliente**

#### 🏠 **Dashboard Cliente**
- **Reservas ativas** e próximas
- **Histórico** de estadias
- **Estatísticas** pessoais
- **Ações rápidas**

#### 📅 **Minhas Reservas**
- **Listagem** de reservas do usuário
- **Edição** de reservas existentes
- **Cancelamento** de reservas
- **Filtros** por status e data

#### 🅿️ **Reservar Estacionamento**
- **Seleção** de data e horário
- **Escolha** de vaga disponível
- **Formulário** de dados do veículo
- **Confirmação** e pagamento

---

## ⚙️ Configuração e Instalação

### 📋 **Pré-requisitos**

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Backend** rodando na porta 4000

### 🔧 **Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Configurações opcionais
NEXT_PUBLIC_APP_NAME=Smart Parking
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 🚀 **Instalação**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/smart-parking.git
cd smart-parking/frontend

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# 4. Execute o projeto
npm run dev
# ou
yarn dev
```

---

## 🚀 Executando o Projeto

### 🛠️ **Desenvolvimento**

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

### 🏗️ **Build para Produção**

```bash
# Build do projeto
npm run build

# Iniciar servidor de produção
npm start
```

### 🔍 **Linting e Formatação**

```bash
# Executar ESLint
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format
```

---

## 🎨 Componentes Principais

### 🧩 **Componentes de UI**

#### **Button**
```typescript
// Componente de botão reutilizável
<Button 
  variant="primary" 
  size="md" 
  icon="arrow"
  onClick={handleClick}
>
  Clique aqui
</Button>
```

#### **Card**
```typescript
// Card para exibir informações
<Card 
  title="Título do Card"
  subtitle="Subtítulo opcional"
  className="custom-class"
>
  Conteúdo do card
</Card>
```

#### **Modal**
```typescript
// Modal para confirmações e formulários
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Título do Modal"
>
  Conteúdo do modal
</Modal>
```

### 📊 **Componentes de Dashboard**

#### **StatCard**
```typescript
// Card de estatística
<StatCard
  title="Vagas Ocupadas"
  value="45"
  change="+12%"
  trend="up"
  icon="car"
/>
```

#### **StatisticsTable**
```typescript
// Tabela de estatísticas
<StatisticsTable
  data={statisticsData}
  columns={tableColumns}
  onRowClick={handleRowClick}
/>
```

### 🅿️ **Componentes de Estacionamento**

#### **ParkingSpot**
```typescript
// Representação visual de uma vaga
<ParkingSpot
  id="001"
  status="livre" // livre, ocupada, manutencao
  onClick={handleSpotClick}
/>
```

---

## 📊 Páginas e Rotas

### 🏠 **Rotas Públicas**

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Página inicial com apresentação |
| `/login` | Login | Autenticação de usuários |
| `/register` | Register | Cadastro de novos usuários |
| `/reservas` | Reservas | Reservar estacionamento |

### 👨‍💼 **Rotas Administrativas** (Protegidas)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/admin` | Dashboard | Painel principal do admin |
| `/admin/vagas` | Vagas | Gestão de vagas |
| `/admin/reservas` | Reservas | Gestão de reservas |
| `/admin/relatorios` | Relatórios | Relatórios e analytics |
| `/admin/sensores` | Sensores | Gestão de sensores IoT |

### 👤 **Rotas do Cliente** (Protegidas)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/cliente/dashboard` | Dashboard | Painel do cliente |
| `/cliente/reservas` | Minhas Reservas | Gestão de reservas pessoais |

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar servidor de produção
npm run lint         # Executar ESLint
npm run lint:fix     # Corrigir problemas do ESLint

# Análise
npm run analyze      # Analisar bundle
npm run type-check   # Verificar tipos TypeScript
```

---

## 📱 Responsividade

### 📐 **Breakpoints**

```css
/* Tailwind CSS Breakpoints */
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large desktop */
```

### 📱 **Design Mobile-First**

- **Mobile**: Layout em coluna única
- **Tablet**: Grid de 2 colunas
- **Desktop**: Grid de 3+ colunas
- **Navegação**: Menu hambúrguer em mobile
- **Componentes**: Adaptáveis a todos os tamanhos

---

## 🔐 Autenticação

### 🔑 **Sistema de Auth**

```typescript
// Context de autenticação
const { user, login, logout, isLoading } = useAuth();

// Verificar autenticação
if (!user) {
  router.push('/login');
}

// Verificar role
if (user?.role !== 'admin') {
  router.push('/');
}
```

### 🛡️ **Proteção de Rotas**

```typescript
// Middleware de autenticação
useEffect(() => {
  if (!isLoading && !user) {
    router.push('/login');
  }
}, [user, isLoading, router]);
```

### 👥 **Roles de Usuário**

- **`user`**: Cliente comum
- **`admin`**: Administrador do sistema

---

## 🎯 Funcionalidades Avançadas

### 📊 **Dashboard em Tempo Real**

- **WebSocket** para atualizações live
- **Polling** automático de dados
- **Cache** inteligente com React Query
- **Otimização** de performance

### 📈 **Analytics e Relatórios**

- **Chart.js** para visualizações
- **Filtros** avançados por período
- **Exportação** em múltiplos formatos
- **Métricas** personalizáveis

### 🔄 **Estado Global**

- **Context API** para autenticação
- **Local Storage** para persistência
- **Estado** otimizado e reativo
- **Sincronização** entre componentes

### 🎨 **Design System**

- **Tailwind CSS** para estilização
- **Componentes** reutilizáveis
- **Tema** consistente
- **Acessibilidade** WCAG 2.1

---

## 📱 Screenshots

<div align="center">
  <h3>Interface do Painel Administrativo</h3>
</div>

<div align="center">
  <h4>1. Dashboard Principal</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/1.png?raw=true" alt="Dashboard Principal" width="800" />
  <p>Painel principal com métricas em tempo real, gráficos interativos e ações rápidas</p>
</div>

<div align="center">
  <h4>2. Gestão de Vagas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/2.png?raw=true" alt="Gestão de Vagas" width="800" />
  <p>Visualização e gerenciamento de todas as vagas com status em tempo real via sensores IoT</p>
</div>

<div align="center">
  <h4>3. Gestão de Reservas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/3.png?raw=true" alt="Gestão de Reservas" width="800" />
  <p>Controle completo de reservas com filtros avançados e detalhes de cada reserva</p>
</div>

<div align="center">
  <h4>4. Gestão de Sensores</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/4.png?raw=true" alt="Gestão de Sensores" width="800" />
  <p>Configuração e monitoramento de sensores IoT (vagas e estacionamentos)</p>
</div>

<div align="center">
  <h4>5. Informações de Sensores</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/5.png?raw=true" alt="Informações de Sensores" width="800" />
  <p>Análise detalhada com estatísticas, gráficos e dados históricos dos sensores</p>
</div>

<div align="center">
  <h4>6. Gestão de Estacionamentos</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/6.png?raw=true" alt="Gestão de Estacionamentos" width="800" />
  <p>CRUD completo de estacionamentos com informações detalhadas</p>
</div>

<div align="center">
  <h4>7. Relatórios</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/7.png?raw=true" alt="Relatórios" width="800" />
  <p>Relatórios avançados com gráficos, métricas e exportação de dados</p>
</div>

<div align="center">
  <h4>8. Tela de Reservas</h4>
  <img src="https://github.com/FatecFranca/DSM-G02-PI4-2025-2/blob/main/apresentacao/images/8.png?raw=true" alt="Tela de Reservas" width="800" />
  <p>Interface para clientes reservarem estacionamentos com seleção de vagas em tempo real</p>
</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](../../LICENSE) para mais detalhes.

---

<div align="center">
  <h3>🎓 FATEC - Faculdade de Tecnologia de São Paulo</h3>
  <p><strong>Curso:</strong> Desenvolvimento de Software Multiplataforma (DSM)</p>
  <p><strong>Grupo:</strong> DSM-G02 | <strong>Semestre:</strong> 4° | <strong>Ano:</strong> 2025-2</p>
  
  <p>Desenvolvido com ❤️ pela equipe DSM-G02</p>
  
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</div>
# 📱 Smart Parking App (React Native + Expo)

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</div>

## 📋 Índice

- [📖 Sobre o App](#-sobre-o-app)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura do App](#️-arquitetura-do-app)
- [🛠️ Stack Mobile](#️-stack-mobile)
- [⚙️ Configuração do Ambiente](#️-configuração-do-ambiente)
- [🚀 Execução e Build](#-execução-e-build)
- [🧭 Navegação](#-navegação)
- [🎨 Temas e UI](#-temas-e-ui)
- [🔐 Autenticação](#-autenticação)
- [🌐 Integração com Backend](#-integração-com-backend)
- [🧪 Qualidade e Utilitários](#-qualidade-e-utilitários)
- [🧰 Troubleshooting](#-troubleshooting)
- [❓ FAQs](#-faqs)
- [📊 Documentação da API](#-documentação-da-api)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 📖 Sobre o App

O **Smart Parking App** é o aplicativo móvel do ecossistema Smart Parking. Construído com **React Native** e **Expo**, ele permite ao usuário:

- Consultar disponibilidade de vagas em tempo real
- Realizar e gerenciar reservas
- Visualizar métricas pessoais e histórico
- Receber feedback imediato com uma UI moderna
- Autenticar-se como cliente ou administrador (com redirecionamentos de acordo com o perfil)

## ✨ Funcionalidades

### 👤 Experiência do Usuário
- **🔍 Localização e Disponibilidade**
  - Vagas disponíveis em tempo real
  - Distância/posição do estacionamento
  - Status atualizado via sensores IoT

- **📅 Reserva de Vagas**
  - Escolha de vaga e horário
  - Confirmação/cancelamento
  - Alerta de status (feedback visual)

- **🚗 Meu Estacionamento**
  - Histórico de reservas
  - Tempo da estadia
  - Resumo de valores (quando aplicável)

- **💳 Pagamentos (roadmap)**
  - PIX e cartão (integração futura)
  - Recibos e histórico

### 👨‍💼 Suporte ao Admin
- Redirecionamento para área admin no login com `role=admin`
- Links/contexto para operações administrativas

## 🏗️ Arquitetura do App

```
React Native (Expo)
├─ contexts/ (Auth, Theme)
├─ app/       (telas/páginas - App Router do Expo)
├─ components/ (UI reutilizável, blocos de tela)
├─ lib/       (api, hooks, utils)
└─ assets/    (imagens, fontes)
```

## 🛠️ Stack Mobile

- **React Native + Expo** (SDK 53)
- **TypeScript** (tipagem forte)
- **React Navigation** (tabs/stack)
- **AsyncStorage** (persistência de sessão)
- **Lucide/Vector Icons** (ícones)

## ⚙️ Configuração do Ambiente

### 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**
- **Expo CLI** (`npm i -g expo-cli`, opcional)
- Backend rodando em `http://localhost:4000` (ajustável)

### 🔧 Variáveis de Ambiente (Expo)

Crie/valide `app/app.config.js` (ou `.local.js`) com as variáveis usadas pelo app:

```js
export default ({ config }) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:4000",
  }
});
```

Você também pode definir em `.env` (se usar dotenv-cli) ou no ambiente do CI/CD.

## 🚀 Execução e Build

### 🛠️ Desenvolvimento (Expo)

```bash
cd app
npm install
npx expo start
```

### 📱 Executando no Dispositivo

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

> Dica: use o aplicativo Expo Go para ler o QR Code no Android/iOS.

### 📦 Build (APK/AAB/IPA) com EAS

```bash
eas login                 # faça login na sua conta Expo
EAS_BUILD=1 eas build:configure

# Android
EAS_BUILD=1 eas build --platform android

# iOS (requer conta Apple)
EAS_BUILD=1 eas build --platform ios
```

Os artefatos ficam disponíveis no painel do Expo (link exibido no terminal).

## 🧭 Navegação

- Tabs inferiores: Home, Reservas, Perfil
- Stacks para detalhes (ex.: confirmação de reserva)
- Redirecionamento por role após login (user → Reservas, admin → Admin)

## 🎨 Temas e UI

- Design system baseado em utility-classes (Tailwind-like) e estilos consistentes
- Componentes reutilizáveis (Button, Card, StatCounter, etc.)
- Suporte a modo claro/escuro (se habilitado no dispositivo)

## 🔐 Autenticação

- Contexto `AuthContext` com `login`, `register`, `logout`
- Persistência de `token` e `user` via `AsyncStorage`
- Injeção de `Authorization: Bearer <token>` automaticamente no cliente API
- Proteção de rotas sensíveis via checagem de `user`/`role`

## 🌐 Integração com Backend

- Base URL: `EXPO_PUBLIC_API_BASE_URL`
- Endpoints principais consumidos:
  - `POST /auth/login`, `POST /auth/register`
  - `GET /parkings`, `GET /parking-slots`
  - `POST /reservations`, `GET /reservations/me`, `PUT /reservations/:id`, `DELETE /reservations/:id`
  - `GET /active-plates`

## 🧪 Qualidade e Utilitários

```bash
# Lint
npm run lint

# Formatação (se configurado)
npm run format

# Testes (se configurado)
npm test
```

## 🧰 Troubleshooting

- "Network request failed":
  - Confirme `EXPO_PUBLIC_API_BASE_URL` acessível do dispositivo
  - No emulador Android, use `http://10.0.2.2:4000` (em vez de `localhost`)
- 401/"Token ausente":
  - Verifique se o login salvou `auth_token` e `auth_user`
  - Garanta que o cliente API envia `Authorization` no header
- Expo não abre no dispositivo:
  - Verifique que PC e celular estão na mesma rede
  - Tente `expo start --tunnel`

## ❓ FAQs

- Posso rodar sem backend? → Algumas telas (mock) funcionam, mas reservas exigem API.
- Como alterar o tema? → Ajuste classes utilitárias e/ou tema no contexto.
- Onde ficam as rotas? → Em `app/app/` (páginas e stacks).

## 📊 Documentação da API

- Swagger UI: `http://localhost:4000/api-docs`
- Auth: JWT Bearer Token
- Formato: JSON

## 🤝 Contribuição

1. **Fork** do projeto
2. **Branch**: `git checkout -b feature/nova-feature`
3. **Commit**: `git commit -m "feat(app): adiciona nova feature"`
4. **Push**: `git push origin feature/nova-feature`
5. **Pull Request** com descrição clara

### 📝 Padrões de Código
- Use **TypeScript** em todos os arquivos
- Siga as convenções do **ESLint**
- Escreva **testes** para novas funcionalidades (quando presentes)
- Documente componentes e fluxos principais

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
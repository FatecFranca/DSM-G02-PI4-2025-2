# 🚀 Guia de Configuração - Smart Parking Backend

Este guia irá ajudá-lo a configurar e executar o projeto Smart Parking Backend.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🔧 Configuração Inicial

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd smart-parking-backend
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/smart_parking"

# Server
PORT=8080
NODE_ENV=development

# JWT (para futuras implementações)
JWT_SECRET=your_jwt_secret_here
```

**Substitua os valores:**
- `username`: Seu usuário do PostgreSQL
- `password`: Sua senha do PostgreSQL
- `localhost:5432`: Host e porta do PostgreSQL
- `smart_parking`: Nome do banco de dados

### 4. Configure o Banco de Dados

```bash
# Crie o banco de dados no PostgreSQL
createdb smart_parking

# Execute as migrações
npm run db:migrate

# Gere o cliente Prisma
npm run db:generate
```

### 5. Execute o Seed

```bash
# Popule o banco com dados de teste
npm run seed
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em: `http://localhost:8080`

### Produção

```bash
# Build do projeto
npm run build

# Iniciar em produção
npm run start:prod
```

## 🧪 Testes

### Testes de Stress

```bash
# Certifique-se de que o servidor está rodando
npm run dev

# Em outro terminal, execute os testes de stress
npm run stress
```

### Testes Unitários

```bash
# Executar testes
npm test
```

## 📊 Dados de Teste

O seed criará os seguintes dados:

- **3 Estacionamentos** com diferentes características
- **180 Vagas** distribuídas entre os estacionamentos
- **75 Sensores** para monitoramento de vagas
- **16 Sensores Ambientais** para monitoramento do ambiente
- **~525 Registros de Dados** de sensores
- **~240 Registros de Dados** de sensores ambientais
- **5 Mensagens de Contato** de exemplo

### Estacionamentos Criados:

1. **Shopping Center Parking** (50 vagas)
   - Localização: Rua das Flores, 123, São Paulo
   - 20 sensores de vaga
   - 5 sensores ambientais

2. **Estacionamento Centro** (30 vagas)
   - Localização: Av. Paulista, 1000, São Paulo
   - 15 sensores de vaga
   - 3 sensores ambientais

3. **Parking Aeroporto** (100 vagas)
   - Localização: Rodovia dos Bandeirantes, 500, Guarulhos
   - 40 sensores de vaga
   - 8 sensores ambientais

## 🔍 Verificando a Instalação

### 1. Teste Básico da API

```bash
# Teste se o servidor está respondendo
curl http://localhost:8080/parkings

# Deve retornar uma lista de estacionamentos
```

### 2. Verificar Dados no Banco

```bash
# Abrir Prisma Studio para visualizar os dados
npm run db:studio
```

### 3. Teste de Endpoints Específicos

```bash
# Listar estacionamentos ativos
curl http://localhost:8080/parkings/active

# Listar vagas disponíveis
curl http://localhost:8080/parking-slots/available

# Listar sensores ativos
curl http://localhost:8080/sensors/active
```

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build do projeto
npm run start            # Iniciar servidor
npm run start:prod       # Iniciar em produção

# Banco de dados
npm run db:migrate       # Executar migrações
npm run db:generate      # Gerar cliente Prisma
npm run db:seed          # Executar seed
npm run db:studio        # Abrir Prisma Studio

# Testes
npm test                 # Executar testes
npm run stress           # Executar testes de stress

# Seed manual
npm run seed             # Executar seed manualmente
```

## 🐛 Solução de Problemas

### Erro de Conexão com Banco

```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Verifique se o banco existe
psql -l | grep smart_parking

# Recrie o banco se necessário
dropdb smart_parking
createdb smart_parking
npm run db:migrate
npm run seed
```

### Erro de Porta em Uso

```bash
# Verifique se a porta 8080 está em uso
lsof -i :8080

# Mate o processo se necessário
kill -9 <PID>
```

### Erro de Dependências

```bash
# Limpe o cache do npm
npm cache clean --force

# Remova node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📈 Monitoramento

### Logs do Servidor

O servidor exibe logs detalhados incluindo:
- Requisições recebidas
- Erros de validação
- Operações de banco de dados
- Tempo de resposta

### Métricas de Performance

O stress test fornece:
- Taxa de sucesso dos endpoints
- Tempo médio de resposta
- Tempo mínimo e máximo
- Detalhes por endpoint

## 🔄 Atualizações

### Atualizar Schema

```bash
# Após modificar o schema.prisma
npm run db:migrate
npm run db:generate
```

### Recriar Dados de Teste

```bash
# Limpar e recriar dados
npm run seed
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do servidor
2. Execute os testes de stress para identificar endpoints problemáticos
3. Verifique a conexão com o banco de dados
4. Consulte a documentação da API no README.md

---

**🎉 Parabéns! Seu ambiente está configurado e pronto para desenvolvimento!**

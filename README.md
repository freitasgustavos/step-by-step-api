# Step-by-Step API

> API modular construída com NestJS e Prisma para integração de múltiplos domínios, incluindo consulta de CEP e submissão de dados.

---

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) (framework Node.js)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) (testes)

---

## Pré-requisitos

- **Banco de dados PostgreSQL:**
  - É necessário ter uma instância de banco de dados PostgreSQL acessível.
  - Crie um banco de dados e anote a string de conexão.
- **Variáveis de ambiente:**
  - Antes de rodar o sistema, crie um arquivo `.env` na raiz do projeto com a variável:
    ```env
    DATABASE_URL="postgresql://usuario:senha@host:porta/nome_do_banco"
    ```
  - Substitua `usuario`, `senha`, `host`, `porta` e `nome_do_banco` conforme sua configuração.

---

## Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/freitasgustavos/step-by-step-api
   cd step-by-step-api
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure o banco de dados:**
   - Ajuste o arquivo `.env` com a string de conexão do banco.
   - Rode as migrações:
     ```bash
     npx prisma migrate dev
     ```
4. **Inicie a aplicação:**
   ```bash
   npm run start:dev
   ```

---

## Estrutura de Pastas

```
src/
  app.controller.ts      # Controller principal
  app.service.ts         # Serviço principal (info da API)
  cep/                   # Módulo de consulta de CEP
  prisma/                # Serviço e módulo do Prisma
  submission/            # Módulo de submissão de dados
prisma/
  schema.prisma          # Schema do banco de dados
  migrations/            # Migrações do Prisma
```

---

## Endpoints Principais

- `GET /`  
  Retorna informações sobre a API, ambiente, rotas e status do Prisma.

- `GET /cep/:cep`  
  Consulta endereço a partir de um CEP (usando provider externo, ex: ViaCEP).

- `POST /submission`  
  Endpoint para submissão de dados (verifique o contrato no código).

---

## Prisma

- O projeto utiliza o Prisma ORM para acesso ao banco de dados.
- Para rodar migrações:
  ```bash
  npx prisma migrate dev
  ```
- Para acessar o Prisma Studio:
  ```bash
  npx prisma studio
  ```

---

## Testes

- Para rodar todos os testes:
  ```bash
  npm test
  ```
- Testes unitários e de integração estão localizados em `src/**/*.spec.ts` e `test/`.

---

## Observações

- O sistema foi projetado para ser modular e desacoplado, facilitando a troca de integrações externas (ex: consulta de CEP).
- Variáveis de ambiente são gerenciadas via `@nestjs/config`.
- Para mais detalhes, consulte os arquivos de cada módulo.

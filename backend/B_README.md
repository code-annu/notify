# Notify — Backend

A notification management platform backend that enables developers to register applications, configure notification channels, manage app users, and handle user notification preferences — all through a secure, RESTful API.

---

## Features

- **Authentication & Authorization** — Signup, login, and JWT-based session management with access & refresh token rotation.
- **User Profile Management** — View, update, and soft-delete user profiles.
- **Application Management** — Create, update, delete, toggle, and list applications owned by the authenticated user.
- **Notification Channels** — Configure per-app notification channels (e.g., email, SMS, push) with toggle support.
- **App User Management** — Register, update, and remove end-users for each application in bulk or individually.
- **Notification Preferences** — Per-user, per-channel notification opt-in/opt-out preferences.
- **Request Validation** — Schema-based input validation on every endpoint using Zod.
- **Centralized Error Handling** — Custom `AppError` hierarchy with typed error codes and consistent JSON error responses.
- **Dependency Injection** — Fully decoupled architecture powered by Inversify IoC container.
- **Clean Architecture** — Strict separation into Domain, Application, Infrastructure, and API layers.

---

## Tech Stack / Tools

| Category       | Technology                                                  |
| -------------- | ----------------------------------------------------------- |
| Language       | TypeScript (strict mode)                                    |
| Runtime        | Node.js                                                     |
| Framework      | Express 5                                                   |
| ORM            | Prisma 7 (with `@prisma/adapter-pg` for connection pooling) |
| Database       | PostgreSQL (hosted on Supabase)                             |
| Authentication | JSON Web Tokens (`jsonwebtoken`), bcrypt                    |
| Validation     | Zod                                                         |
| DI Container   | Inversify + `reflect-metadata`                              |
| API Key Gen    | `generate-api-key`                                          |
| Dev Tooling    | Nodemon, ts-node                                            |

---

## Installation & Setup

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **PostgreSQL** database (or a Supabase project)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd Notify/backend

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables section below)
cp .env.example .env   # then fill in your values

# 4. Generate the Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev

# 6. Start the development server
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in `.env`).

---

## Usage

### Running the Server

```bash
# Development (with hot-reload via nodemon)
npm run dev
```

### Example API Calls

#### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecureP@ss123",
    "first_name": "John",
    "last_name": "Doe",
    "company_name": "Acme Inc"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecureP@ss123"
  }'
```

#### Create an App (Authenticated)

```bash
curl -X POST http://localhost:3000/api/apps \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "My App",
    "description": "Push notification service"
  }'
```

### API Route Summary

| Method   | Endpoint                              | Auth | Description                     |
| -------- | ------------------------------------- | ---- | ------------------------------- |
| `POST`   | `/api/auth/signup`                    | No   | Register a new user             |
| `POST`   | `/api/auth/login`                     | No   | Login and receive tokens        |
| `POST`   | `/api/auth/refresh-token`             | No   | Refresh an expired access token |
| `GET`    | `/api/profile`                        | Yes  | Get current user profile        |
| `PATCH`  | `/api/profile`                        | Yes  | Update profile details          |
| `DELETE` | `/api/profile`                        | Yes  | Soft-delete profile             |
| `GET`    | `/api/apps`                           | Yes  | List all user's apps            |
| `POST`   | `/api/apps`                           | Yes  | Create a new app                |
| `GET`    | `/api/apps/:appId`                    | Yes  | Get app by ID                   |
| `PATCH`  | `/api/apps/:appId`                    | Yes  | Update an app                   |
| `DELETE` | `/api/apps/:appId`                    | Yes  | Delete an app                   |
| `PATCH`  | `/api/apps/:appId/toggle`             | Yes  | Toggle app active state         |
| `GET`    | `/api/apps/:appId/channels`           | Yes  | List channels for an app        |
| `POST`   | `/api/apps/:appId/channels`           | Yes  | Create a notification channel   |
| `GET`    | `/api/app-channels/:channelId`        | Yes  | Get channel by ID               |
| `DELETE` | `/api/app-channels/:channelId`        | Yes  | Delete a channel                |
| `PATCH`  | `/api/app-channels/:channelId/toggle` | Yes  | Toggle channel active state     |
| `GET`    | `/api/apps/:appId/users`              | Yes  | List users for an app           |
| `POST`   | `/api/apps/:appId/users`              | Yes  | Add users to an app (bulk)      |
| `DELETE` | `/api/apps/:appId/users`              | Yes  | Remove users from an app (bulk) |
| `GET`    | `/api/app-users/:userId`              | Yes  | Get app user by ID              |
| `PATCH`  | `/api/app-users/:userId`              | Yes  | Update app user                 |
| `DELETE` | `/api/app-users/:userId`              | Yes  | Delete an app user              |

---

## Architecture Overview

The project follows **Clean Architecture** principles with four distinct layers:

```
backend/
├── prisma/                         # Prisma schema & migrations
│   └── schema.prisma
├── prisma.config.ts                # Prisma CLI configuration
├── src/
│   ├── server.ts                   # Entry point — starts Express server
│   ├── app.ts                      # Express app setup, routes & middleware
│   │
│   ├── domain/                     # 🔵 Domain Layer (core business logic)
│   │   ├── entity/                 #    Domain entities (User, App, Session, etc.)
│   │   ├── repository/             #    Repository interfaces (contracts)
│   │   └── error/                  #    Custom error types & codes
│   │
│   ├── application/                # 🟢 Application Layer (use cases)
│   │   ├── usecase/                #    Business logic use cases
│   │   │   ├── authentication/     #      Signup, Login, RefreshToken
│   │   │   ├── profile/            #      Get, Update, Delete profile
│   │   │   ├── user_app/           #      CRUD + Toggle for apps
│   │   │   ├── app_channel/        #      CRUD + Toggle for channels
│   │   │   └── app_users/          #      Add, Update, Delete, Get app users
│   │   └── dto/                    #    Data Transfer Objects
│   │
│   ├── infrastructure/             # 🟠 Infrastructure Layer (external concerns)
│   │   ├── repository/             #    Prisma repository implementations
│   │   └── mapper/                 #    Entity ↔ Prisma model mappers
│   │
│   ├── api/                        # 🔴 API Layer (HTTP interface)
│   │   ├── controller/             #    Route handlers (Auth, Profile, App, etc.)
│   │   ├── router/                 #    Express route definitions
│   │   ├── middleware/             #    Auth, Validation, Error handling
│   │   ├── schema/                 #    Zod validation schemas
│   │   └── response/               #    Response DTOs / formatters
│   │
│   ├── di/                         # Inversify DI container configuration
│   │   ├── inversify.config.ts     #    Container bindings
│   │   └── inversify.types.ts      #    Symbol constants
│   │
│   ├── config/                     # App configuration
│   │   ├── env.ts                  #    Environment variable loader
│   │   └── prisma.client.ts        #    Prisma client setup with pg adapter
│   │
│   ├── util/                       # Shared utilities
│   │   ├── jwt.util.ts             #    JWT sign/verify helpers
│   │   └── object.util.ts          #    Object cleaning utilities
│   │
│   └── generated/                  # Auto-generated Prisma client
└── package.json
```

### Request Flow

```
Client Request
  → Express Router
    → Middleware (Auth / Validation)
      → Controller
        → Use Case (business logic)
          → Repository Interface (domain contract)
            → Prisma Repository (infrastructure implementation)
              → PostgreSQL (Supabase)
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

| Variable                 | Description                                        | Example                           |
| ------------------------ | -------------------------------------------------- | --------------------------------- |
| `PORT`                   | Port the server listens on                         | `3000`                            |
| `JWT_ACCESS_SECRET`      | Secret key for signing access tokens               | `your-access-secret`              |
| `JWT_ACCESS_EXPIRES_IN`  | Access token expiry duration                       | `60m`                             |
| `JWT_REFRESH_SECRET`     | Secret key for signing refresh tokens              | `your-refresh-secret`             |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry duration                      | `15d`                             |
| `DATABASE_URL`           | PostgreSQL connection string (pooled/pgBouncer)    | `postgresql://...?pgbouncer=true` |
| `DIRECT_URL`             | Direct PostgreSQL connection (used for migrations) | `postgresql://...`                |
| `SUPABASE_PROJECT_URL`   | Supabase project URL                               | `https://xxx.supabase.co`         |
| `SUPABASE_SECRET_KEY`    | Supabase service role key                          | `sb_secret_...`                   |

---

## Testing

> **Note:** No test suite is currently configured. The `test` script in `package.json` is a placeholder.

To add tests in the future, consider:

```bash
# Install a test framework (e.g., Jest)
npm install --save-dev jest ts-jest @types/jest

# Run tests
npm test
```

---

## Deployment

### Build for Production

```bash
# Compile TypeScript to JavaScript
npx tsc

# The compiled output will be in the ./dist directory
node dist/server.js
```

### Supabase / Cloud Deployment Notes

- The database is hosted on **Supabase** using pgBouncer for connection pooling (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`).
- Ensure all environment variables are set in your hosting provider's environment configuration.
- Run `npx prisma migrate deploy` in your CI/CD pipeline to apply migrations on deployment.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "feat: add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

### Guidelines

- Follow the existing **Clean Architecture** layer boundaries.
- Add Zod schemas for all new request bodies.
- Register new use cases and controllers in the Inversify DI container (`inversify.config.ts` / `inversify.types.ts`).
- Use the established error handling pattern (`AppError` subclasses).

---

## License

ISC

# typescript-clean-starter

A production-ready reference starter and template implementing Uncle Bob's Clean Architecture in TypeScript, powered by Fastify and Vitest.

---

## Project Overview

This repository demonstrates how to architect a modern TypeScript backend adhering strictly to Clean Architecture principles. It separates domain logic, application use cases, and external infrastructure adapters into distinct, decoupled concentric layers.

### Architectural Layers

```
                +---------------------------------------+
                |            Infrastructure             |
                |  (Fastify HTTP, Controllers, In-Mem)  |
                |   +-------------------------------+   |
                |   |          Application          |   |
                |   |    (Use Cases, Ports/DTOs)    |   |
                |   |   +-----------------------+   |   |
                |   |   |        Domain         |   |   |
                |   |   |   (Entities, Values)  |   |   |
                |   |   +-----------------------+   |   |
                |   +-------------------------------+   |
                +---------------------------------------+
```

1. **Domain Layer (`src/domain`)**: Encapsulates enterprise business rules, entities (`Order`), and value objects (`Price`) with domain invariants. Has zero external runtime dependencies.
2. **Application Layer (`src/application`)**: Orchestrates business logic via use cases (`CreateOrder`) and declares abstract ports (`OrderRepository`).
3. **Infrastructure Layer (`src/infrastructure`)**: Implements external drivers, persistence mechanisms (`InMemoryOrderRepository`), and HTTP controllers (`OrdersController`) using Fastify.
4. **Composition Root (`src/composition`)**: Assembles dependencies using the Dependency Inversion Principle without hardcoupling layers.

---

## Features

- **Strict Clean Architecture**: Clear separation of concerns with inverted dependencies.
- **Robust Value Objects & Domain Invariants**: Validated monetary calculations and immutable domain states.
- **Defensive HTTP Validation**: Comprehensive boundary validation on incoming payloads and error translation.
- **Fastify HTTP Engine**: Lightweight, high-throughput asynchronous HTTP handling.
- **Isolated Unit & Integration Testing**: Fast, isolated test suite powered by Vitest with zero external infrastructure requirements.
- **Graceful Process Lifecycle**: Signal handling (`SIGINT`, `SIGTERM`) ensuring graceful server termination.

---

## Prerequisites

- **Node.js**: `v20.x` or higher (tested on LTS releases)
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`

---

## Installation & Build

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AntonioHellin/clean-architecture-ts.git
   cd clean-architecture-ts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   Copy the example environment configuration file:
   ```bash
   cp .env.example .env
   ```

4. **Compile TypeScript**:
   ```bash
   npm run build
   ```

---

## Configuration

The application is configured through environment variables. The supported keys and default values are detailed below:

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | `3000` | Port for the HTTP server to bind. |
| `HOST` | String | `0.0.0.0` | Host IP address binding. |
| `NODE_ENV` | String | `development` | Runtime environment (`development`, `production`, `test`). |
| `APP_NAME` | String | `typescript-clean-starter` | Application identifier. |
| `DB_HOST` | String | `localhost` | Database host (for persistent adapter implementations). |
| `DB_PORT` | Number | `5432` | Database port. |
| `DB_NAME` | String | `clean_architecture_db` | Database schema/name. |
| `DB_USER` | String | `postgres` | Database user (empty default in production). |
| `DB_PASSWORD` | String | *(empty in prod)* | Database password (must be provided in production). |
| `EMAIL_API_KEY` | String | *(empty in prod)* | API key for external email delivery adapter. |
| `EMAIL_FROM` | String | `noreply@example.com` | Default sender email address. |

---

## Usage

### Development Mode

Start the server with hot execution using `tsx`:

```bash
npm run dev
```

### Production Mode

Build the project and run the compiled artifacts:

```bash
npm run build
node dist/main.js
```

### API Endpoints

#### 1. Health Check
- **Route**: `GET /health`
- **Description**: Verifies server responsiveness and returns the current timestamp.

```bash
curl -X GET http://localhost:3000/health
```

**Response (`200 OK`)**:
```json
{
  "status": "ok",
  "timestamp": "2026-09-23T14:00:00.000Z"
}
```

#### 2. Create Order
- **Route**: `POST /orders`
- **Headers**: `Content-Type: application/json`
- **Description**: Validates input, applies domain rules, and persists a new order.

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-1001",
    "customerId": "CUST-450",
    "items": [
      {
        "productId": "PROD-A",
        "quantity": 2,
        "unitPrice": 19.99
      },
      {
        "productId": "PROD-B",
        "quantity": 1,
        "unitPrice": 49.50
      }
    ]
  }'
```

**Response (`201 Created`)**:
```json
{
  "orderId": "ORD-1001",
  "total": 89.48
}
```

**Error Response (`400 Bad Request`)**:
```json
{
  "error": "Bad Request",
  "message": "Item at index 0 has invalid productId, quantity (must be positive integer), or unitPrice (must be non-negative number)"
}
```

---

## Testing

Run the full suite of unit and HTTP integration tests using Vitest:

```bash
# Execute test suite once
npm test

# Run tests in watch mode
npm run test:watch
```

---

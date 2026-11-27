# Express + PostgreSQL + TypeScript REST API

A modular REST API built with **Express.js**, **PostgreSQL (Neon)** and **TypeScript**. It includes user management (CRUD) and JWT-based authentication, organized in a clean module pattern (route → controller → service → database).

## Features

- User CRUD (create, read, update, delete)
- Secure password hashing with **bcrypt**
- Login with **JWT** access token (1 day expiry)
- Account status check (`is_active`)
- Auto table creation on server start (`users`, `profile`)
- Modular folder structure, easy to extend with new modules
- Environment-based configuration

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL (Neon) via `pg` |
| Auth | JSON Web Token (`jsonwebtoken`) |
| Hashing | `bcrypt` |
| Dev tool | `tsx` |

## Project Structure

```
src/
├── config/
│   └── index.ts            # env variables
├── db/
│   └── index.ts            # pg Pool + initDB (table creation)
├── modules/
│   ├── auth/
│   │   ├── auth.interface.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   └── auth.route.ts
│   └── users/
│       ├── user.interface.ts
│       ├── user.service.ts
│       ├── user.controller.ts
│       └── user.route.ts
├── app.ts                  # express app setup
└── server.ts               # server entry point
```

**Flow:** `Route → Controller → Service → Database`

- **Route:** maps URL to controller
- **Controller:** reads request, sends response
- **Service:** business logic and SQL queries

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/badsha-11/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_long_random_secret
```

Generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Run the server

```bash
npm run dev
```

Server runs at `http://localhost:5000`. Tables are created automatically on first run.

## API Endpoints

Base URL: `/api/v1`

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login and get access token |

**Request body**

```json
{
  "email": "josh@gmail.com",
  "password": "abcd"
}
```

**Response**

```json
{
  "success": true,
  "message": "User Login Successfully!!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a new user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

**Create user body**

```json
{
  "name": "JOSH",
  "age": 28,
  "email": "josh@gmail.com",
  "password": "abcd"
}
```

## Database Schema

**users**

| Column | Type | Notes |
|---|---|---|
| id | SERIAL | primary key |
| name | VARCHAR(255) | |
| email | VARCHAR(255) | unique, not null |
| password | VARCHAR(255) | bcrypt hash |
| age | INT | |
| is_active | BOOLEAN | default `true` |
| created_at | TIMESTAMP | default `NOW()` |
| updated_at | TIMESTAMP | default `NOW()` |

**profile** (one-to-one with users, `ON DELETE CASCADE`)

| Column | Type |
|---|---|
| id | SERIAL |
| user_id | INT (unique, references `users.id`) |
| bio, address | TEXT |
| phone, gender | VARCHAR |
| created_at, updated_at | TIMESTAMP |

## Roadmap

- [ ] Auth middleware to protect routes
- [ ] Input validation with Zod
- [ ] Centralized error handling
- [ ] Pagination
- [ ] Role-based access control

## Author

**Isran Khan**

- GitHub: [badsha-11](https://github.com/badsha-11)
- LinkedIn: [isran-khan](https://linkedin.com/in/isran-khan)
- Portfolio: [isran-khan.vercel.app](https://isran-khan.vercel.app)
# Task Manager

A simple task management API built with TypeScript, Node.js, and Prisma. This project helps you manage tasks with a clean and structured codebase.

## Features

- RESTful API for task management
- TypeScript for type safety and improved development experience
- Prisma ORM for database migrations and queries
- Docker Compose configuration for easy PostgreSQL setup

## Prerequisites

- **Node.js** (v14 or later)
- **npm** (or yarn)
- **Docker** (optional, if using Docker Compose for the database)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shemigam1/task_manager.git
   cd task_manager
   npm install
   ```

2. **Create a .env file in the project root with the following content:**

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5434/task_manager_db?schema=public"
PORT=3000
JWT_SECRET=your_jwt_secret
```

A compose.yaml file is provided to quickly spin up a PostgreSQL instance.
change the POSTRGES_USER and POSTGRES_PASSWD to fit the DATABASE_URL

```
docker-compose up -d
```

Verify that PostgreSQL is running on the default port (5432).

After setting up your database, run the Prisma migrations:

```
npx prisma migrate dev --name init
```

Start the development server with hot-reloading:

```
npm run dev
```

Check out the postman documentation
https://documenter.getpostman.com/view/39517923/2sAYdkFoPa

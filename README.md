# Adikara

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Hono, tRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality
- **Tauri** - Build native desktop applications
- **PWA** - Progressive Web App support

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:
```bash
bun db:push
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the client application.

The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
adikara/
├── apps/
│   ├── client/      # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, tRPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:client`: Start only the client application
- `bun dev:server`: Start only the server
- `bun types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun check`: Run Biome formatting and linting
- `cd apps/client && bun pwa:generate`: Generate PWA assets
- `cd apps/client && bun desktop:dev`: Start Tauri desktop app in development
- `cd apps/client && bun desktop:build`: Build Tauri desktop app

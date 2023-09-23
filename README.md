# README for Backend Demo Project

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Introduction

Welcome to the **backend-demo** project! This is a backend application template with a focus on Node.js and TypeScript. It's designed to provide you with a starting point for building RESTful APIs, web services, or other backend applications. Below, you will find information on how to set up, configure, and run this project.

I recommend using `PNPM` instead of NPM or YARN because `PNPM` is faster and more efficient. The entire project is built using `PNPM`.

## Project Structure

Here's an overview of the project structure:

- `src/`: This directory contains the source code for your application.
  - `index.ts`: The main entry point of the application.
  - `prisma/`: This directory contains Prisma-related files.
    - `schema.prisma`: The Prisma schema definition.
    - `seed.ts`: A script for seeding the database.
- `build/`: This directory will contain the transpiled JavaScript code after running the build script.
- `node_modules/`: This directory contains project dependencies.
- `package.json`: The project configuration file.
- `tsconfig.json`: TypeScript configuration.
- `README.md`: This documentation file.

## Prerequisites

Before you start, make sure you have the following software installed on your system:

- Node.js (Version specified in `package.json`)
- TypeScript (Version specified in `package.json`)
- Prisma CLI (Version specified in `package.json`)
- MySQL or a database compatible with Prisma (configured in `src/prisma/schema.prisma`)

## Getting Started

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/TheJhoNY75/backend_typescript_demo.git
    ```

2. Navigate to the project directory:

   ```bash
   cd backend_typescript_demo
   ```

3. Install the project dependencies:

   ```bash
   pnpm install
    ```
### Configuration

1. Create a `.env` file in the root directory of the project:

   ```bash
    # Example .env file
    PORT=3000
    DB_URL=mysql://user:password@localhost:3306/mydb
    JWT_SECRET=your-secret-key
    BYCRYPT_SALT=10
   ```

   Make sure to replace the placeholders with your actual values.

### Running the Application

To start the application in development mode, run:
  
  ```bash
  pnpm run dev
  ```

The application will run at `http://localhost:3000`.

To build and start the application in production mode, run:

  ```bash
  pnpm run build
  pnpm start
  ```

## Scripts

- `pnpm start`: Starts the application in production mode.
- `pnpm run dev`: Start the application in development mode using `ts-node-dev`.
- `pnpm run build`: Build the TypeScript code into JavaScript.
- `pnpm run test`: Placeholder script for running tests (You can configure your tests here).

## Dependencies

- `@prisma/client`: Prisma client for database access.
- `bcrypt`: For password hashing and verification.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- `dotenv`: For loading environment variables from a .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: For creating and verifying JSON Web Tokens (JWT).
- `morgan`: HTTP request logger middleware.
- `swagger-jsdoc` and `swagger-ui-express`: For API documentation using Swagger.

## Dev Dependencies

- `@types/bcrypt`, `@types/cors`, `@types/express`, `@types/jsonwebtoken`, `@types/morgan`: Type definitions for development.
- `@types/swagger-jsdoc` and `@types/swagger-ui-express`: Type definitions for Swagger.
- `prisma`: Prisma CLI for database migrations and seeding.
- `ts-node` and `ts-node-dev`: TypeScript execution environment for development.
- `ts-standard`: TypeScript linter configuration.
- `typescript`: TypeScript compiler.

## License

This project is licensed under TheJhoNY75.

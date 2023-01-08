export const swaggerSpecs = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "TypeScript API",
      version: "1.0.0",
      description: "Using Express and TypeScript to build a REST API",
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

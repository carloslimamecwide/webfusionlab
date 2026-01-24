import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WebFusionLab API",
      version: "1.0.0",
      description: "API da WebFusionLab - Contacto, Projetos e Admin",
      contact: {
        name: "WebFusionLab",
        email: "contact@webfusionlab.pt",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desenvolvimento",
      },
      {
        url: "https://api.webfusionlab.pt",
        description: "Servidor de produção",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/contact.ts", "./src/routes/admin.ts", "./src/routes/public.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

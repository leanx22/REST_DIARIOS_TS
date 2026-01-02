import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API - DIARIES",
      version: "1.0.0",
      description: "Technologies: Node, express, typescript, mongodb, JWT, Zod, Swagger, Bruno.",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: [
    "./src/modules/diary/diary.router.ts",
    "./src/modules/diary/diary.controller.ts",

    "./src/modules/user/user.routes.ts",
    "./src/modules/user/user.controller.ts"], 
};

// Generamos la especificación (el JSON interno)
const swaggerSpec = swaggerJSDoc(options);

// Función para levantar la documentación
export const swaggerDocs = (app: Express, port: number | string) => {
  // 1. Ruta para ver la documentación visual
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 2. Ruta para obtener el JSON en crudo (útil para Postman)
  app.get("/api/docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`-> Documentación disponible en http://localhost:${port}/api/docs`);
};
import { CONFIG } from "./../config/process";
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de mi API -> files-manager",
    version: "1.0.0",
  },
  servers: [
    {
      url: CONFIG.BASE_URL || "http://localhost:3001/",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "Bearer",
      },
    },
    schemas: {
      User: {
        type: "object",
        required: ["name", "username", "email", "password"],
        properties: {
          name: {
            type: "string",
          },
          username: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      File: {
        type: "object",
        required: ["name", "fileUpload"],
        properties: {
          nameFile: {
            type: "string",
          },
          fileUpload: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);

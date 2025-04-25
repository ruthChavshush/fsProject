import { SwaggerOptions } from 'swagger-ui-express';

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fetch API',
      description: 'API documentation for fetch project',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;

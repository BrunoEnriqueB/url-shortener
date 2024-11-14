import env from '@/config/environment';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'API para encurtamento de URLs com gerenciamento de usuários'
    },
    servers: [
      {
        url: env.API_URL
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;

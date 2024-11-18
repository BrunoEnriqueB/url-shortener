import env from '@/config/environment';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  apis: ['./src/routes/*.ts'],
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation with Swagger'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // Optional: Use 'JWT' or specify your format
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Unauthorized'
                  }
                }
              }
            }
          }
        },
        NotFoundError: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Not Found'
                  }
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation Error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: {
                          type: 'string',
                          example: 'username'
                        },
                        message: {
                          type: 'string',
                          example: 'email is required'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    servers: [
      {
        url: env.API_URL
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ]
  }
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;

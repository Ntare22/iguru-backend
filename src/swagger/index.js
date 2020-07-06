import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const swaggerDef = {
  definition: {
    info: {
      title: 'Iguru-backend',
      version: '1.0.0',
      description: 'Digitize insurance',
    },
    host: process.env.BASE_URL,
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'token',
        description: 'First login to get a token then paste it in "value" below',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./src/swagger/*.swagger.js'],
};

const swaggerDoc = swaggerJSDoc(swaggerDef);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc);
});

router.use('/', swaggerui.serve, swaggerui.setup(swaggerDoc));

export default router;

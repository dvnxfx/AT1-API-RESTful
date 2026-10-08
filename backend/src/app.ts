import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import movieRoutes from './routes/movieRoutes';
import './models/Movie';

export const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Filmoteca API - LDW AT1',
      version: '1.0.0',
      description: 'Documentação da API da Filmoteca com PostgreSQL e Sequelize',
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(movieRoutes);
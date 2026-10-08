import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import sequelize from './config/database';



const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor a correr em http://localhost:${PORT}`);
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Erro na ligação ao banco de dados:', err);
  });
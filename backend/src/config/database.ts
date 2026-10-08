import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

const sequelize = isTestEnvironment
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'filmoteca',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        dialectOptions: process.env.DB_SSL === 'true' ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {},
        logging: false,
      }
    );

export default sequelize;
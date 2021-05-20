import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST } = process.env;
const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: parseInt(DB_PORT),
  host: DB_HOST,
  models: [path.join(__dirname, '..', 'entities', '*.{ts,js}')]
});

export default async function connect(): Promise<never | void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
}

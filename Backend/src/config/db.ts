import { Sequelize } from 'sequelize';

const db = new Sequelize('moviesapp_db', 'root', '', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, 
});

export default db;

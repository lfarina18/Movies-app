import { Sequelize } from 'sequelize';

const config = require(__dirname + "/../config/config");

const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default db;

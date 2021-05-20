const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

const config = {
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: 'mysql',
  migrationStorageTableName: 'migrations'
};

module.exports = {
  development: config,
  production: config
};

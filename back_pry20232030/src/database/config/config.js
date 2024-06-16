const environmentVariables = require('../../config');

module.exports = {
  development: {
    username: environmentVariables.dev.databaseUsername,
    password: environmentVariables.dev.databasePassword,
    database: environmentVariables.dev.databaseName,
    port: environmentVariables.dev.databasePort,
    host: environmentVariables.dev.databaseHost,
    dialect: 'postgres',
  },
  test: {
    username: environmentVariables.test.databaseUsername,
    password: environmentVariables.test.databasePassword,
    database: environmentVariables.test.databaseName,
    port: environmentVariables.test.databasePort,
    host: environmentVariables.test.databaseHost,
    dialect: 'postgres',
  },
};

require('dotenv').config();

const environmentVariables = {
  dev: {
    databaseUsername: process.env.DEV_DATABASE_USERNAME,
    databasePassword: process.env.DEV_DATABASE_PASSWORD,
    databaseName: process.env.DEV_DATABASE_NAME,
    databasePort: process.env.DEV_DATABASE_PORT,
    databaseHost: process.env.DEV_DATABASE_HOST,
  },
  test: {
    databaseUsername: process.env.TEST_DATABASE_USERNAME,
    databasePassword: process.env.TEST_DATABASE_PASSWORD,
    databaseName: process.env.TEST_DATABASE_NAME,
    databasePort: process.env.TEST_DATABASE_PORT,
    databaseHost: process.env.TEST_DATABASE_HOST,
  },
};

module.exports = environmentVariables;

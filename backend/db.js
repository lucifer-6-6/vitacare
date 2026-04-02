const { Sequelize } = require('sequelize');
require('dotenv').config();

// Attempt to use env variables, fallback to typical local postgres credentials
const sequelize = new Sequelize(
  process.env.DB_NAME || 'vitacare',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres', // default fallback password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

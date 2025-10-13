const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  { dialect: "postgres", host: process.env.DB_HOST }
);

async function authenticateHandler() {
  try {
    await sequelize.authenticate();
    console.log("Database successfully connected.");
  } catch (error) {
    console.error("Authentication failed.", error.message);
  }
}

authenticateHandler();

module.exports = sequelize;

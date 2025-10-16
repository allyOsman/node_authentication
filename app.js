const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

require("./models/user");
const authRoutes = require("./routes/auth");
const sequelize = require("./databases/db");
const logger = require("./utils/logger");

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/api", authRoutes);

async function startServer() {
  try {
    await sequelize.sync({ force: false, alter: false });
    logger.info("Database synchronized successfully.");

    const server = app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });

    const shutdownHandler = async () => {
      try {
        await sequelize.close();
        logger.info("Database connection successfully closed.");

        server.close(() => {
          logger.info("Server stopped.");
          process.exit(0);
        });
      } catch (error) {
        logger.error("Shutdown failed", error);
      }
    };

    process.on("SIGINT", shutdownHandler);
    process.on("SIGTERM", shutdownHandler);
  } catch (error) {
    logger.error("Failed to  start server.", error);
    process.exit(1);
  }
}

startServer();

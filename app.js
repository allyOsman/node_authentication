const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(cors());

require("./models/user");
const authRoutes = require("./routes/auth");
const sequelize = require("./databases/db");

app.use("/api", authRoutes);

async function startServer() {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log("Database synchronized successfully.");

    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    const shutdownHandler = async () => {
      try {
        await sequelize.close();
        console.log("Database connection successfully closed.");

        server.close(() => {
          console.log("Server stopped.");
          process.exit(0);
        });
      } catch (error) {
        console.error("Shutdown failed", error);
      }
    };

    process.on("SIGINT", shutdownHandler);
    process.on("SIGTERM", shutdownHandler);
  } catch (error) {
    console.error("Failed to  start server.", error);
    process.exit(1);
  }
}

startServer();

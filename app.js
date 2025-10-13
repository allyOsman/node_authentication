const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();
const port = process.env.SERVER_PORT;

require("./models/user");

app.use(helmet());
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const sequelize = require("./databases/db");

app.use("/api", authRoutes);

async function connectionHandler() {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log("synchronization successfully.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Sunchronization failed.", error.message);
  }
}

connectionHandler();

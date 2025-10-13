const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../databases/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.beforeCreate(async (user) => {
  const hash = await bcrypt.hash(user.password, 12);
  user.password = hash;
});
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;
  }
});

module.exports = User;

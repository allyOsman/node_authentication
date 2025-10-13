const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res, next) => {
  try {
    const { user_id, username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign(
      { id: user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    const { password: _, ...userData } = user.toJSON(); // hide password from response.

    res.status(201).json({
      message: "user registration successfully.",
      user: userData,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};
exports.login = async (req, res, next) => {};
exports.events = async (req, res, next) => {};
exports.special = async (req, res, next) => {};

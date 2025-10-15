const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    // Create a JWT token
    const token = jwt.sign(
      { id: newUser.user_id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: { id: newUser.user_id, username, email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    // check user
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    //check password
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //generate token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      user: { id: user.user_id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.events = async (req, res, next) => {};
exports.special = async (req, res, next) => {};

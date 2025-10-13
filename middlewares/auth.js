const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split("")[1];

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

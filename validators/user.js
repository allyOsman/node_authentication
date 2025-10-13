const { body } = require("express-validator");

exports.registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").isEmail().withMessage("please enter a valid email."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

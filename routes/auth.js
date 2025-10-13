const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validators/user");
const { userValidate } = require("../middlewares/validate");

const userController = require("../controllers/auth");

//POST:api/register
router.post(
  "/register",
  registerValidator,
  userValidate,
  userController.register
);
//POST:api/login
router.post("/login", userController.login);

//GET:api/events
router.get("/events", userController.events);

//GET:api/special
router.get("/special", userController.special);

module.exports = router;

const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validators/user");
const { userValidate } = require("../middlewares/validate");
const { verifyToken } = require("../middlewares/auth");

const { register, login, events, special } = require("../controllers/auth");

//POST:api/register
router.post("/register", registerValidator, userValidate, register);

//POST:api/login
router.post("/login", login);

//GET:api/events
router.get("/events", verifyToken, events);

//GET:api/special
router.get("/special", verifyToken, special);

module.exports = router;

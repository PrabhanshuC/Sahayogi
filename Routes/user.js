const express = require("express");

const router = express.Router();

const authenticator = require("../Middlewares/authentication");

const register = require("../Controllers/user/registration");
const login = require("../Controllers/user/login");
const logout = require("../Controllers/user/logout");

router.use(authenticator);

router.get("/register", register);
router.get("/login", login);
router.post("/register", register);
router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;

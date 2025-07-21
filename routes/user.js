const express = require("express");

const router = express.Router();

const authenticator = require("../middlewares/authentication");

const registration_page = require("../controllers/user/registration_page");
const login_page = require("../controllers/user/login_page");

const register = require("../controllers/user/registration");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");

router.get("/register", registration_page);
router.get("/login", login_page);
// router.get("/dashboard", authenticator, dashboard);

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", logout);

module.exports = router;

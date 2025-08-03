const express = require("express");
const router = express.Router();

// Middleware Import
const authenticate = require("../middlewares/authentication");

// Controller Imports
const home = require("../controllers/home");
const registration_page = require("../controllers/pages/registration_page");
const login_page = require("../controllers/pages/login_page");
const dashboard = require("../controllers/pages/dashboard");

// Page-Serving Routes
router.get("/", home);
router.get("/user/register", registration_page);
router.get("/user/login", login_page);
router.get("/user/dashboard", authenticate, dashboard);

module.exports = router;

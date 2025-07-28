const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");

// Controller Imports
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/logout
router.post("/logout", authenticate, logout);

module.exports = router;

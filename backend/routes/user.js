const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middlewares/authentication");

// Controller Imports
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");
const { get_user_profile, update_user_profile } = require("../controllers/user/profile");

// Authentication Routes
router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", authenticate, logout);

// User Profile Routes
router.get("/api/users/profile", authenticate, get_user_profile);
router.put("/api/users/profile", authenticate, update_user_profile);

module.exports = router;

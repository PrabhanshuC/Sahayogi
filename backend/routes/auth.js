const router = require('express').Router();

// Middleware Imports
const authenticate = require('../middlewares/authentication');
const { validate, register_validation, login_validation } = require('../middlewares/validation');

// Controller Imports
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");

// User Authentication Routes

// Handles POST /api/auth/register
router.post('/register', register_validation, validate, register);

// Handles POST /api/auth/login
router.post('/login', login_validation, validate, login);

// Handles POST /api/auth/logout
router.post('/logout', authenticate, logout);

module.exports = router;

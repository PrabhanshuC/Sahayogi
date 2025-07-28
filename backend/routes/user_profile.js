const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");

// Controller Imports
const { get_user_profile, update_user_profile } = require("../controllers/user/profile");

// Handles GET /api/users/profile
router.get("/profile", authenticate, get_user_profile);

// Handles PUT /api/users/profile
router.put("/profile", authenticate, update_user_profile);

module.exports = router;

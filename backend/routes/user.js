const express = require("express");
const router = express.Router();

// Middleware Import
const authenticate = require("../middlewares/authentication");

// Controller Imports
const get_profile = require("../controllers/user/get_user_profile");
const update_profile = require("../controllers/user/update_profile");
const delete_profile = require("../controllers/user/delete_profile");
const get_user_articles = require("../controllers/user/get_user_articles");
const search_users = require("../controllers/user/search_user");
const get_public_user_profile = require("../controllers/user/get_public_user_profile");
const get_public_user_articles = require("../controllers/user/get_user_public_articles");

// User Profile Routes

// Private Routes

// Handles GET /api/users/profile
router.get("/profile", authenticate, get_profile);

// Handles PUT /api/users/profile
router.put("/profile", authenticate, update_profile);

// Handles DELETE /api/users/profile
router.delete("/profile", authenticate, delete_profile);

// Handles GET /api/users/:id/articles
router.get("/:id/articles", authenticate, get_user_articles);

// Public Routes

// Handles GET /api/users/search
router.get("/search", search_users);

// Handles GET /api/users/:id
router.get("/:id", get_public_user_profile);

// Handles GET /api/users/:id/public-articles
router.get("/:id/public-articles", get_public_user_articles);

module.exports = router;

const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticator = require("../middlewares/authentication");
const { authorize_admin } = require("../middlewares/authorization");

// Controller Imports
const get_all_users = require("../controllers/admin/get_all_users");
const get_user_articles = require("../controllers/admin/get_user_articles");
const delete_user = require("../controllers/admin/delete_user");

// Admin Routes

// Handles GET /api/admin/users
router.get("/users", authenticator, authorize_admin, get_all_users);

// Handles GET /api/admin/users/:id/articles
router.get("/users/:id/articles", authenticator, authorize_admin, get_user_articles);

// Handles DELETE /api/admin/users/:id
router.delete("/users/:id", authenticator, authorize_admin, delete_user);

module.exports = router;

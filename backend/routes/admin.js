const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middlewares/authentication");
const { authorize_website_admin } = require("../middlewares/authorization");

// Controller Imports
const { get_all_users, update_user_status } = require("../controllers/admin/admin_controller");

// Apply middleware to all routes in this file
router.use(authenticate, authorize_website_admin);

// Site Admin API Routes
router.get("/api/admin/users", authenticate, authorize_website_admin, get_all_users);
router.put("/api/admin/users/:id", authenticate, authorize_website_admin, update_user_status);

// Admin Routes
router.get("/users", get_all_users);
router.put("/users/:id/status", update_user_status);

module.exports = router;

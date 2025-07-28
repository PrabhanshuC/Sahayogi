const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");
const { authorize_website_admin } = require("../middleware/authorization");

// Controller Imports
const { get_all_users, update_user_status } = require("../controllers/admin/admin_controller");

// Apply middleware to all routes in this file
router.use(authenticate, authorize_website_admin);

// Site Admin API Routes
router.get("/users", authenticate, authorize_website_admin, get_all_users);
router.put("/users/:id", authenticate, authorize_website_admin, update_user_status);

// Admin Routes
// router.get("/users", get_all_users);
// router.put("/users/:id/status", update_user_status);

module.exports = router;

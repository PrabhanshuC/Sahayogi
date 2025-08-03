const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");
const { authorize_website_admin } = require("../middleware/authorization");

// Controller Imports
const get_all_users = require("../controllers/admin/get_all_users");
const update_user_status = require("../controllers/admin/update_user_status");
const delete_user = require("../controllers/admin/delete_user");

// Apply middleware to all routes in this file
router.use(authenticate, authorize_website_admin);

// Site Admin API Routes
router.get("/users", get_all_users);
router.put("/users/:id", update_user_status);
router.delete("/users/:id", delete_user)

// Admin Routes
// router.get("/users", get_all_users);
// router.put("/users/:id/status", update_user_status);

module.exports = router;

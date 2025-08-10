const express = require("express");
const router = express.Router();

const global_search = require("../controllers/global_search");

// Global Search Route

// Handles GET /api/search?q=query
router.get("/", global_search); 

module.exports = router;

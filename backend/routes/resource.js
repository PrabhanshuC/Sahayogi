const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middlewares/authentication");
const { authorize_resource } = require("../middlewares/authorization");

// Controller Imports
const get_resource = require("../controllers/resource/get_resource");
const update_resource = require("../controllers/resource/update_resource");
const delete_resource = require("../controllers/resource/delete_resource");

router.get("/api/resources/:id", authenticate, authorize_resource("viewer"), get_resource);
router.put("/api/resources/:id", authenticate, authorize_resource("editor"), update_resource);
router.delete("/api/resources/:id", authenticate, authorize_resource("editor"), delete_resource);

module.exports = router;

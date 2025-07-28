const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");
const { authorize_resource } = require("../middleware/authorization");

// Controller Imports
const get_resource = require("../controllers/resource/get_resource");
const update_resource = require("../controllers/resource/update_resource");
const delete_resource = require("../controllers/resource/delete_resource");

router.get("/:id", authenticate, authorize_resource("viewer"), get_resource);
router.put("/:id", authenticate, authorize_resource("editor"), update_resource);
router.delete("/:id", authenticate, authorize_resource("editor"), delete_resource);

module.exports = router;

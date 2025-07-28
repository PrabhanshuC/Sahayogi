const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middleware/authentication");
const { authorize_workspace } = require("../middleware/authorization");

// Controller Imports
const create_workspace = require("../controllers/workspace/create_workspace");
const get_workspace = require("../controllers/workspace/get_workspace");
const get_workspaces = require("../controllers/workspace/get_workspaces");
const update_workspace = require("../controllers/workspace/update_workspace");
const delete_workspace = require("../controllers/workspace/delete_workspace");

// Resource Controllers (for context-specific actions)
const create_resource_in_workspace = require("../controllers/resource/create_resource");
const get_resources_in_workspace = require("../controllers/resource/get_resources");

// Member Management Controllers
const { add_member, update_member_role, remove_member } = require("../controllers/workspace/member_management");

// Workspace CRUD Operations Routes
router.post("/", authenticate, create_workspace);
router.get("/", authenticate, get_workspaces);
router.get("/:id", authenticate, authorize_workspace("viewer"), get_workspace);
router.put("/:id", authenticate, authorize_workspace("editor"), update_workspace);
router.delete("/:id", authenticate, authorize_workspace("admin"), delete_workspace);

// Member Management Routes
router.post("/:id/members", authenticate, authorize_workspace("admin"), add_member);
router.put("/:id/members/:memberId", authenticate, authorize_workspace("admin"), update_member_role);
router.delete("/:id/members/:memberId", authenticate, authorize_workspace("admin"), remove_member);

// Resources in a Workspace Routes
router.get("/:id/resources", authenticate, authorize_workspace("viewer"), get_resources_in_workspace);
router.post("/:id/resources", authenticate, authorize_workspace("editor"), create_resource_in_workspace);

module.exports = router;

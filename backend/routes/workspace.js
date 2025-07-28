const express = require("express");
const router = express.Router();

// Middleware Imports
const authenticate = require("../middlewares/authentication");
const { authorize_workspace } = require("../middlewares/authorization");

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
router.post("/api/workspaces", authenticate, create_workspace);
router.get("/api/workspaces", authenticate, get_workspaces);
router.get("/api/workspaces/:id", authenticate, authorize_workspace("viewer"), get_workspace);
router.put("/api/workspaces/:id", authenticate, authorize_workspace("editor"), update_workspace);
router.delete("/api/workspaces/:id", authenticate, authorize_workspace("admin"), delete_workspace);

// Member Management Routes
router.post("/api/workspaces/:id/members", authenticate, authorize_workspace("admin"), add_member);
router.put("/api/workspaces/:id/members/:memberId", authenticate, authorize_workspace("admin"), update_member_role);
router.delete("/api/workspaces/:id/members/:memberId", authenticate, authorize_workspace("admin"), remove_member);

// Resources in a Workspace Routes
router.get("/api/workspaces/:id/resources", authenticate, authorize_workspace("viewer"), get_resources_in_workspace);
router.post("/api/workspaces/:id/resources", authenticate, authorize_workspace("editor"), create_resource_in_workspace);

module.exports = router;

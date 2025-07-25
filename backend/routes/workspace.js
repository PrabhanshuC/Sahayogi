const express = require("express");

const router = express.Router();

const authentication = require("../middlewares/authentication");

const create_workspace = require("../controllers/workspace/create_workspace");
const get_workspace = require("../controllers/workspace/get_workspace");
const get_workspaces = require("../controllers/workspace/get_workspaces");
const update_workspace = require("../controllers/workspace/update_workspace");
const delete_workspace = require("../controllers/workspace/delete_workspace");

router.post("/api/workspaces", authentication, create_workspace);
router.get("/api/workspaces", authentication, get_workspaces);
router.get("/api/workspaces/:id", authentication, get_workspace);
router.put("/api/workspaces/:id", authentication, update_workspace);
router.delete("/api/workspaces/:id", authentication, delete_workspace);

router.post("/api/workspaces/:id/members", authentication);
router.get("/api/workspaces/:id/resources", authentication);
router.post("/api/workspaces/:id/resources", authentication);

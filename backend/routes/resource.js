const express = require("express");

const router = express.Router();

const authentication = require("../middlewares/authentication");

const create_resource = require("../controllers/resource/create_resource");
const get_resource = require("../controllers/resource/get_resource");
const get_resources = require("../controllers/resource/get_resources");
const update_resource = require("../controllers/resource/update_resource");
const delete_resource = require("../controllers/resource/delete_resource");

router.post("/api/", authentication, create_resource);
router.get("/api/", get_resources);
router.get("/api/:id", get_resource);
router.put("/api/:id", authentication, update_resource);
router.delete("/api/:id", authentication, delete_resource);

module.exports = router;

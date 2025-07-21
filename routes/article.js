const express = require("express");

const router = express.Router();

const authenticator = require("../middlewares/authentication");

const create_article = require("../controllers/article/create_article");
const get_article = require("../controllers/article/get_article");
const get_articles = require("../controllers/article/get_articles");
const update_article = require("../controllers/article/update_article");
const delete_article = require("../controllers/article/delete_article");

router.post("/", authenticator, create_article);
router.get("/:id", get_article);
router.get("/", get_articles);
router.put("/:id", authenticator, update_article);
router.delete("/:id", authenticator, delete_article);

module.exports = router;

const express = require("express");

const router = express.Router();

const authenticator = require("../Middlewares/authentication");

const create_article = require("../Controllers/article/create_article");
const get_article = require("../Controllers/article/get_article");
const get_articles = require("../Controllers/article/get_articles");
const update_article = require("../Controllers/article/update_article");
const delete_article = require("../Controllers/article/delete_article");

router.use(authenticator);

router.post("/", create_article);
router.get("/:id", get_article);
router.get("/", get_articles);
router.put("/:id", update_article);
router.delete("/:id", delete_article);

module.exports = router;

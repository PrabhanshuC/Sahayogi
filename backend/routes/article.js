const router = require('express').Router();

// Middleware Imports
const authenticate = require('../middlewares/authentication');
const { authorize_author } = require('../middlewares/authorization');
const { validate, article_creation_validation, article_update_validation } = require('../middlewares/validation');

// Controller Import
const create_article = require("../controllers/article/create_article");
const delete_article = require("../controllers/article/delete_article");
const get_article = require("../controllers/article/get_article");
const get_articles = require("../controllers/article/get_articles");
const update_article = require("../controllers/article/update_article");

// Article CRUD Operations Routes

// Handles GET /api/articles/
router.get('/', get_articles);

// Handles GET /api/articles/:id
router.get('/:id', get_article);

// Handles POST /api/articles/
router.post('/', authenticate, article_creation_validation, validate, create_article);

// Handles PUT /api/articles/:id
router.put('/:id', authenticate, authorize_author, article_update_validation, validate, update_article);

// Handles DELETE /api/articles/:id
router.delete('/:id', authenticate, authorize_author, delete_article);

module.exports = router;

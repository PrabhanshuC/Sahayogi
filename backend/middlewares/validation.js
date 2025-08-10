const { validationResult, body } = require("express-validator");

const validate = (request, response, next) =>
{
    const errors = validationResult(request);

    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    
    next();
};

const register_validation = [
    body("username", "Username is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
];

const login_validation = [
    body("uid", "Username or Email is required").not().isEmpty(),
    body("password", "Password is required").exists()
];

const article_creation_validation = [
    body("title", "Title is required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty()
];

const article_update_validation = [
    body("title", "Title is required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty()
];

module.exports = {
    validate,
    register_validation,
    login_validation,
    article_creation_validation,
    article_update_validation
};

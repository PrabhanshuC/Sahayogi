const Article = require("../models/Article");

const authorize_admin = async (request, response, next) =>
{
    if (request.user && request.user.role === "admin")
        return next();
    
    return response.status(403).json({ message: "Forbidden: You must be an administrator to perform this action." });
};

const authorize_author = async (request, response, next) =>
{
    try
    {
        const article = await Article.findById(request.params.id);

        if (!article)
            return response.status(404).json({ msg: "Article not found" });
        
        // const is_author = article.author.toString() === request.user._id.toString();
        // const is_administrator = request.user.role === "admin";

        // if (is_author || is_administrator)
        //     return next();

        if (article.author.toString() !== request.user.id)
            return response.status(401).json({ msg: "User not authorized to perform this action" });

        request.article = article;
        
        next();
    }
    catch (err)
    {
        console.error(err.message);
        if (err.kind === "ObjectId")
        {
            return response.status(404).json({ msg: "Article not found" });
        }
        response.status(500).send("Server Error");
    }
};

module.exports = { authorize_admin, authorize_author };

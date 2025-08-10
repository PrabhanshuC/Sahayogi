const Article = require("../../models/Article");

/**
 * @desc    Get all articles for a specific user
 * @route   GET /api/users/:id/articles
 * @access  Private
 */
const get_user_articles = async (request, response) =>
{
    try
    {
        const user_id = request.params.id;

        const articles = await Article.find({ author: user_id }).populate("author", "username");

        if(!articles.length)
            return response.status(200).json([]);

        return response.status(200).json(articles);
    }
    catch(error)
    {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = get_user_articles;

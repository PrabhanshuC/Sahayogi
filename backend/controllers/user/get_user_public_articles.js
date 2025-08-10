const Article = require("../../models/Article");

/**
 * @desc    Get public articles for a specific user
 * @route   GET /api/users/:id/public-articles
 * @access  Public
 */
const get_public_user_articles = async (request, response) =>
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

        if (error.kind === "ObjectId")
            return response.status(404).json({ message: "Invalid user ID format." });
        
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = get_public_user_articles;

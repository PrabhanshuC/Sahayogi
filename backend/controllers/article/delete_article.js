const Article = require("../../models/Article");

/**
 * @desc    Delete specified article of logged-in user
 * @route   DELETE /api/articles/:id
 * @access  Private
 */
const delete_article = async (request, response) =>
{
    try
    {
        const article = request.article;    // from authorization middleware
    
        await Article.deleteOne({ _id: article._id });

        response.json({ message: 'Article removed' });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = delete_article;

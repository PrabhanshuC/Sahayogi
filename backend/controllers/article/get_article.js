const Article = require("../../models/Article");

/**
 * @desc    Get specified article
 * @route   GET /api/articles/:id
 * @access  Public
 */
const get_article = async (request, response) =>
{
    try
    {
        const article = await Article.findById(request.params.id).populate('author', 'username');

        if (!article)
            return response.status(404).json({ msg: 'Article not found' });
        
        response.json(article);
    }
    catch (err)
    {
        console.error(err.message);

        if (err.kind === 'ObjectId')
            return response.status(404).json({ msg: 'Article not found' });
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = get_article;

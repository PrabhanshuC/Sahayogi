const Article = require('../../models/Article');

/**
 * @desc    Create an article
 * @route   POST /api/articles/
 * @access  Private
 */
const create_article = async (request, response) =>
{
    const { title, content, tags, category } = request.body;

    try
    {
        const new_article = new Article({
            title,
            content,
            tags,
            category,
            author: request.user.id
        });

        const article = await new_article.save();

        response.json(article);
    }
    catch (err)
    {
        console.error(err.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = create_article;

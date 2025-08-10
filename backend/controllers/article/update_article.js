/**
 * @desc    Update specified article of logged-in user
 * @route   PUT /api/articles/:id
 * @access  Private
 */
const update_article = async (req, res) =>
{
    try
    {
        const { title, content, tags, category } = req.body;
        const article = req.article;    // from authorization middleware

        article.title = title;
        article.content = content;
        article.tags = tags;

        await article.save();

        res.json(article);
    }
    catch (err)
    {
        console.error(err.message);
        
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = update_article;

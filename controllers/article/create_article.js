const Article = require("../../models/Article");

const create_article = async (request, response) =>
{
    try
    {
        const { heading, body, tags } = request.body;

        const article = new Article(
            {
                heading,
                body,
                author: request.user.id,
                tags
            }
        );

        await article.save();

        response.status(201).json({ article });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = create_article;

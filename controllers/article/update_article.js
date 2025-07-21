const Article = require("../../models/Article");

const update_article = async (request, response) =>
{
    try
    {
        const { heading, body, author, tags } = request.body;

        const article = await Article.findOneAndUpdate(
            { _id: request.params.id, author: request.user.id },
            {
                heading,
                body,
                author: request.user.id,
                tags
            },
            { new: true }
        );

        response.status(201).json({ article });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = update_article;

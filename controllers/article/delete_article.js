const Article = require("../../models/Article");

const delete_article = async (request, response) =>
{
    try
    {
        await Article.findOneAndDelete({_id: request.params.id});

        response.status(201).json({ message: "Article deleted" });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = delete_article;

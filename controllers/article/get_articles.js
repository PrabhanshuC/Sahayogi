const Article = require("../../models/Article");

const get_articles = async (request, response) =>
{
    try
    {
        const article = await Article.find({ _id: request.params.id, author: request.user.id });

        if(!article)
            return response.status(404).json({ message: "Not found" });

        response.status(200).json({ article });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = get_articles;

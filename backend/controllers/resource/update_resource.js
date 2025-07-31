const Resource = require("../../models/Resource");

const update_resource = async (request, response) =>
{
    try
    {
        const
        {
            title,
            type,
            content,
            tags,
            workspace,
            isPublic
        } = request.body;

        const resource = await Resource.findOneAndUpdate(
            { _id: request.params.id, author: request.user.id },
            {
                title,
                type,
                content,
                author: request.user.id,
                tags,
                workspace,
                isPublic
            }
        );

        response.status(201).json({ resource });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = update_resource;

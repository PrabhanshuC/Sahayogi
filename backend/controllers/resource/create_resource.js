const Resource = require("../../models/Resource");

const create_resource = async (request, response) =>
{
    try
    {
        const
        {
            title,
            type,
            content,
            author,
            tags,
            workspace,
            isPublic
        } = request.body;

        const resource = new Resource(
            {
                title,
                type,
                content,
                author,
                tags,
                workspace,
                isPublic
            }
        );

        await resource.save();

        response.status(201).json({ resource });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = create_resource;

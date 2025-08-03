const Resource = require("../../models/Resource");

const create_resource = async (request, response) =>
{
    try
    {
        const workspace_id = request.params.id;
        const owner_id = request.user.id;
        const
        {
            title,
            type,
            content,
            tags,
            isPublic
        } = request.body;

        if (!workspace_id)
            return response.status(400).json({ message: "Workspace ID is missing from the request URL." });

        const resource = new Resource(
            {
                title,
                type,
                content,
                author: owner_id,
                tags,
                workspace: workspace_id,
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

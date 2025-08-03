const Resource = require("../../models/Resource");

const get_resources = async (request, response) =>
{
    try
    {
        const workspace_id = request.params.id;

        const resources = await Resource.find({ workspace: workspace_id });

        response.status(200).json({ resources });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = get_resources;

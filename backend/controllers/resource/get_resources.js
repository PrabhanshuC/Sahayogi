const Resource = require("../../models/Resource");

const get_resources = async (request, response) =>
{
    try
    {
        const resource = await Resource.find({ _id: request.params.id, owner: request.user.id });

        if(!resource)
            return response.status(404).json({ message: "Not found" });

        response.status(200).json({ resource });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = get_resources;

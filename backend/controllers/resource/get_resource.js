const Resource = require("../../models/Resource");

const get_resource = async (request, response) =>
{
    try
    {
        const resource = await Resource.findOne({ _id: request.params.id, author: request.user.id });

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

module.exports = get_resource;

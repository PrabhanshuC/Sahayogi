const Resource = require("../../models/Resource");

const delete_resource = async (request, response) =>
{
    try
    {
        await Resource.findOneAndDelete({ _id: request.params.id });

        response.status(201).json({ message: "Resource deleted" });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = delete_resource;

const Workspace = require("../../models/Workspace");

const get_workspace = async (request, response) =>
{
    try
    {
        const workspace = await Workspace.findOne({ _id: request.params.id, author: request.user.id });

        if(!workspace)
            return response.status(404).json({ message: "Not found" });

        response.status(200).json({ workspace });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = get_workspace;

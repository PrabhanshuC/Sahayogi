const Workspace = require("../../models/Workspace");

const get_workspace = async (request, response) =>
{
    try
    {
        const workspace = await Workspace.findById(request.params.id)
            .populate("owner", "username")
            .populate("members.user", "username");

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

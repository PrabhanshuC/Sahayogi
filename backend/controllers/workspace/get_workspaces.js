const Workspace = require("../../models/Workspace");

const get_workspaces = async (request, response) =>
{
    try
    {
        const workspaces = await Workspace.find({ "members.user": request.user.id });

        response.status(200).json({ workspaces });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = get_workspaces;

const Workspace = require("../../models/Workspace");

const delete_workspace = async (request, response) =>
{
    try
    {
        await Workspace.findOneAndDelete({_id: request.params.id});

        response.status(201).json({ message: "Workspace deleted" });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = delete_workspace;

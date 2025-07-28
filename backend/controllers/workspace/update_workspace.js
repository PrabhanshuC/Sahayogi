const Workspace = require("../../models/Workspace");

const update_workspace = async (request, response) =>
{
    try
    {
        const { name, members } = request.body;

        const updated_workspace = await Workspace.findByIdAndUpdate(
            request.params.id,
            { name, members },
            { new: true }
        );

        if (!updated_workspace)
            return response.status(404).json({ message: "Workspace not found" });

        response.status(200).json({ workspace: updated_workspace });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = update_workspace;

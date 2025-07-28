const Workspace = require("../../models/Workspace");
const Resource = require("../../models/Resource");
const User = require("../../models/User");

const delete_workspace = async (request, response) =>
{
    try
    {
        const delete_resources = request.body;

        const workspace_id = request.params.id;
        const user_id = request.user.id;

        const workspace = await Workspace.findById(workspace_id);

        if (!workspace)
            return response.status(404).json({ message: "Workspace not found" });

        if (workspace.owner.toString() !== user_id)
            return response.status(403).json({ message: "Forbidden: Only the owner can delete this workspace." });

        if(delete_resources)
            await Resource.deleteMany({ workspace: workspace_id });
        else
        {
            const owner = await User.findById(user_id);

            if (!owner.private_workspace)
                return response.status(500).json({ message: "Cannot move resources: Owner has no private workspace." });

            await Resource.updateMany(
                { workspace: workspace_id },
                { $set: { workspace: owner.private_workspace } }
            );
        }

        await Workspace.findByIdAndDelete(workspace_id);

        response.status(200).json({ message: "Workspace deleted" });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = delete_workspace;

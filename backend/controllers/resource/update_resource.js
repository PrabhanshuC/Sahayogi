const Resource = require("../../models/Resource");
const Workspace = require("../../models/Workspace");

const update_resource = async (request, response) =>
{
    try
    {
        const { title, type, content, tags, isPublic, workspace: target_workspace_id } = request.body;
        const resource_id = request.params.id;
        const user_id = request.user.id;

        const resource = await Resource.findById(resource_id);

        if (!resource)
            return response.status(404).json({ message: "Resource not found" });

        // Security Check 1: User must be the author to edit.
        if (resource.author.toString() !== user_id)
            return response.status(403).json({ message: "Forbidden: You are not the author of this resource." });

        // Logic to handle moving the resource to a new workspace
        if (target_workspace_id && target_workspace_id !== resource.workspace.toString())
        {
            const target_workspace = await Workspace.findById(target_workspace_id);

            if (!target_workspace)
                return response.status(404).json({ message: "Target workspace not found." });

            // Security Check 2: User must be a member of the target workspace.
            const is_member = target_workspace.members.some(member => member.user.toString() === user_id);

            if (!is_member)
                return response.status(403).json({ message: "Forbidden: You are not a member of the target workspace." });
            
            resource.workspace = target_workspace_id;
        }

        // Update other fields
        resource.title = title || resource.title;
        resource.type = type || resource.type;
        resource.content = content || resource.content;
        resource.tags = tags || resource.tags;
        resource.isPublic = isPublic !== undefined ? isPublic : resource.isPublic;

        const updated_resource = await resource.save();

        response.status(200).json({ resource: updated_resource });
    }
    catch(error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = update_resource;

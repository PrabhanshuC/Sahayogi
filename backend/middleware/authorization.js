const Workspace = require("../models/Workspace");
const Resource = require("../models/Resource");

const authorize_workspace = (required_role) =>
{
    return async (request, response, next) =>
    {
        try
        {
            const workspace_id = request.params.id;
            const user_id = request.user.id;

            const workspace = await Workspace.findById(workspace_id);

            if (!workspace)
                return response.status(404).json({ message: "Workspace not found" });

            const workspace_member = workspace.members.find(member => member.user.toString() === user_id);

            if (!workspace_member)
                return response.status(403).json({ message: "Forbidden: You are not a member of this workspace." });

            const roles = ["viewer", "editor", "admin"];
            const user_role_index = roles.indexOf(workspace_member.role);
            const required_role_index = roles.indexOf(required_role);

            if (user_role_index >= required_role_index)
                return next();
            
            return response.status(403).json({ message: `Forbidden: You are not authorized. This action requires the "${required_role}" role.` });

        }
        catch (error)
        {
            console.error(error.message);
            
            return response.status(500).json({ message: "Internal Server Error" });
        }
    };
};

const authorize_resource = (required_role) =>
{
    return async (request, response, next) =>
    {
        try
        {
            const resource_id = request.params.id;
            const user_id = request.user.id;

            const resource = await Resource.findById(resource_id);

            if (!resource)
                return response.status(404).json({ message: "Resource not found" });

            // Public Access Check
            if (resource.isPublic && required_role === "viewer")
                return next();

            // Explicit Resource-Level Access Check
            const resource_member = resource.members.find(member => member.user.toString() === user_id);

            if (resource_member)
            {
                const roles = ["viewer", "editor"];

                if (roles.indexOf(resource_member.role) >= roles.indexOf(required_role))
                    return next();
            }

            // Workspace-Level Access Check (Fallback)
            const workspace = await Workspace.findById(Resource.workspace);

            if (!workspace)
                return response.status(404).json({ message: "Parent workspace not found" });

            const workspace_member = workspace.members.find(member => member.user.toString() === user_id);

            if (!workspace_member)
                 return response.status(403).json({ message: "Forbidden: You are not a member of the parent workspace." });

            const workspace_roles = ["viewer", "editor", "admin"];

            if (workspace_roles.indexOf(workspace_member.role) >= workspace_roles.indexOf(required_role))
                return next();

            return response.status(403).json({ message: `Forbidden: This action requires the "${required_role}" role.` });
        }
        catch (error)
        {
            console.error(error.message);
            
            return response.status(500).json({ message: "Internal Server Error" });
        }
    };
};

const authorize_website_admin = (request, response, next) =>
{
    if (request.user && request.user.role === "admin")
        next();
    else
        response.status(403).json({ message: "Forbidden: This action requires site administrator privileges." });
};

module.exports =
{
    authorize_workspace,
    authorize_resource,
    authorize_website_admin
};

const Workspace = require("../../models/Workspace");
const User = require("../../models/User");

/**
 * @desc    Add a member to a workspace
 * @route   POST /api/workspaces/:id/members
 * @access  Private (Workspace Admin)
 */
const add_member = async (request, response) =>
{
    try
    {
        const { email, role } = request.body;
        const { id: workspace_id } = request.params;

        const user_to_add = await User.findOne({ email });

        if (!user_to_add)
            return response.status(404).json({ message: "User with that email not found." });

        const workspace = await Workspace.findById(workspace_id);

        if (!workspace)
            return response.status(404).json({ message: "Workspace not found." });

        const is_already_member = workspace.members.some(member => member.user.toString() === user_to_add.id);

        if (is_already_member)
            return response.status(400).json({ message: "User is already a member of this workspace." });

        workspace.members.push({ user: user_to_add.id, role });

        await workspace.save();

        const updated_workspace = await Workspace.findById(workspace_id).populate("members.user", "username email");

        response.status(200).json(
            {
                message: "Member added successfully.",
                workspace: updated_workspace
            }
        );

    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Server Error" });
    }
};

/**
 * @desc    Update a member's role in a workspace
 * @route   PUT /api/workspaces/:id/members/:memberId
 * @access  Private (Workspace Admin)
 */
const update_member_role = async (request, response) =>
{
    try
    {
        const { role } = request.body;
        const { workspace_id, member_id } = request.params;

        const workspace = await Workspace.findById(workspace_id);
        
        if (!workspace)
            return response.status(404).json({ message: "Workspace not found." });

        if (workspace.owner.toString() === member_id)
            return response.status(400).json({ message: "Cannot change the owner's role." });

        const member = workspace.members.find(m => m.user.toString() === member_id);

        if (!member)
            return response.status(404).json({ message: "Member not found in this workspace." });

        member.role = role;

        await workspace.save();
        
        const updated_workspace = await Workspace.findById(workspace_id).populate("members.user", "username email");

        response.status(200).json(
            {
                message: "Member role updated successfully.",
                workspace: updated_workspace
            }
        );

    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Server Error" });
    }
};

/**
 * @desc    Remove a member from a workspace
 * @route   DELETE /api/workspaces/:id/members/:memberId
 * @access  Private (Workspace Admin)
 */
const remove_member = async (request, response) => {
    try {
        const { workspace_id, member_id } = request.params;

        const workspace = await Workspace.findById(workspace_id);
        
        if (!workspace)
            return response.status(404).json({ message: "Workspace not found." });

        if (workspace.owner.toString() === member_id)
            return response.status(400).json({ message: "Cannot remove the workspace owner." });

        workspace.members = workspace.members.filter(m => m.user.toString() !== member_id);
        await workspace.save();
        
        const updated_workspace = await Workspace.findById(workspace_id).populate("members.user", "username email");

        response.status(200).json(
            {
                message: "Member removed successfully.",
                workspace: updated_workspace
            }
        );

    }
    catch(error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Server Error" });
    }
};

module.exports =
{
    add_member,
    update_member_role,
    remove_member
};

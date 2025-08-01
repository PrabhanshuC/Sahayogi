const User = require("../../models/User");
const Workspace = require("../../models/Workspace");
const Resource = require("../../models/Resource");

/**
 * @desc    Delete a user and their associated content
 * @route   DELETE /api/admin/users/:id
 * @access  Admin
 */
const delete_user = async (request, response) =>
{
    try
    {
        const { status } = request.body; 
        const user_id = request.params.id;

        const update_payload = { status };

        if (status === "pendingDeletion")
        {
            const deletionDate = new Date();

            deletionDate.setDate(deletionDate.getDate() + 30);
            update_payload.deletionScheduledFor = deletionDate;
        }
        else
            update_payload.deletionScheduledFor = null;

        const user = await User.findByIdAndUpdate(user_id, update_payload, { new: true });
        const userId = request.params.id;
        // This is a destructive action. In a real app, you might just "deactivate"
        // the user. Here, we will perform a full deletion.
        
        // 1. Delete user"s workspaces
        await Workspace.deleteMany({ owner: userId });
        // 2. Delete user"s resources
        await Resource.deleteMany({ author: userId });
        // 3. Delete the user
        await User.findByIdAndDelete(userId);

        response.status(200).json({ message: "User and all associated content deleted." });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: "Server Error" });
    }
};

module.exports = delete_user;

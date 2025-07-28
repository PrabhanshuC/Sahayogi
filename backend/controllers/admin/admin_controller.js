const User = require("../../models/User");
const Workspace = require("../../models/Workspace");
const Resource = require("../../models/Resource");

/**
 * @desc    Get all users in the system
 * @route   GET /api/admin/users
 * @access  Admin
 */
const get_all_users = async (request, response) =>
{
    try
    {
        const users = await User.find().select("-password");

        response.status(200).json({ users });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Server Error" });
    }
};

/**
 * @desc    Admin updates a user"s account status (activate, deactivate, or schedule deletion)
 * @route   PUT /api/admin/users/:id/status
 * @access  Admin
 */
const update_user_status = async (request, response) =>
{
    try
    {
        // Admin provides the desired status in the request body
        const { status } = request.body;
        const user_id = request.params.id;

        // Validate the input status
        const valid_statuses = ["active", "deactivated", "pendingDeletion"];

        if (!valid_statuses.includes(status))
            return response.status(400).json({ message: "Invalid status provided." });

        const update_payload = { status };
        let response_message = `User status updated to ${status}.`;

        if (status === "pendingDeletion")
        {
            const deletion_date = new Date();
            deletion_date.setDate(deletion_date.getDate() + 30);
            update_payload.deletion_scheduled_for = deletion_date;
            response_message = "User account has been scheduled for permanent deletion in 30 days.";
        }
        else
            update_payload.deletion_scheduled_for = null;

        const user = await User.findByIdAndUpdate(user_id, update_payload, { new: true }).select("-password");

        if (!user)
            return response.status(404).json({ message: "User not found." });

        response.status(200).json({ message: response_message, user });
    }
    catch(error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Server Error" });
    }
};

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

module.exports =
{
    get_all_users,
    update_user_status,
    delete_user
}

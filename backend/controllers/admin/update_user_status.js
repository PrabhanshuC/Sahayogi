const User = require("../../models/User");

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

module.exports = update_user_status;

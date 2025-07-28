const User = require("../../models/User");

const { revoke_token } = require("../../utils/authUtils");

/**
 * @desc    User requests to delete their own account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
const request_account_deletion = async (request, response) =>
{
    try
    {
        const { deleteContent } = request.body; // Expecting { "deleteContent": boolean }
        const user_id = request.user.id;
        const user = await User.findById(user_id);

        if (!user)
            return response.status(404).json({ message: "User not found" });

        if (deleteContent === true)
        {
            // Logic for PERMANENT DELETION
            const deletion_date = new Date();
        
            deletion_date.setDate(deletion_date.getDate() + 30);

            user.status = "pendingDeletion";
            user.deletionScheduledFor = deletion_date;

            await user.save();

            // Log the user out immediately by blacklisting their token
            revoke_status = await revoke_token(token);

            if(revoke_status.status !== 200)
                return response.status(revoke_status.status).json({ message: revoke_status.message });
            
            response.status(200).json({ message: "Your account is scheduled for permanent deletion in 30 days. You have been logged out." });
        }
        else
        {
            // --- Logic for DEACTIVATION (Soft Delete) ---
            user.status = "deactivated";
            await user.save();
            
            // Log the user out immediately
            revoke_status = await revoke_token(token);

            if(revoke_status.status !== 200)
                return response.status(revoke_status.status).json({ message: revoke_status.message });

            return response.status(200).json({ message: "Your account has been deactivated. Your public content will remain. You have been logged out." });
        }
    }
    catch (error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = request_account_deletion;

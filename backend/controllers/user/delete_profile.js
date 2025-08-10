const config = require("../../global_variables")
const User = require("../../models/User");
const Article = require("../../models/Article");
const { revoke_token } = require("../../utilities/revoke_token");

/**
 * @desc    User requests to delete their own account or deactivate it
 * @route   DELETE /api/users/profile
 * @access  Private
 */
const request_account_deletion = async (request, response) =>
{
    try
    {
        // Expecting { "delete_content": boolean } in the request body
        const { delete_content } = request.body; 
        const user_id = request.user.id; // ID of the currently authenticated user
        const user = await User.findById(user_id);

        if (!user)
            return response.status(404).json({ message: "User not found" });

        // Revoke the current user's token immediately
        const token = request.header("Authorization")?.split(" ")[1];
        const revoke_status = await revoke_token(token);

        if(revoke_status.status !== 200)
            return response.status(revoke_status.status).json({ message: revoke_status.message });

        if (delete_content === true)
        {
            // Option 1: Delete user and all associated content permanently
            await Article.deleteMany({ author: user_id }); // Delete all articles by this user
            await User.findByIdAndDelete(user_id); // Delete the user account

            response.status(200).json({ message: "Your account and all associated content have been permanently deleted. You have been logged out." });
        }
        else
        {
            // Option 2: Deactivate account and anonymize articles
            // Update articles to point to an 'anonymous' user
            
            await Article.updateMany(
                { author: user_id },
                { $set: { author: config.ANONYMOUS } }
            );

            // Mark user status as deactivated
            user.status = "deactivated";
            user.deletion_scheduled_for = null; // Clear scheduled deletion if it was set
            await user.save();

            response.status(200).json({ message: "Your account has been deactivated. Your public content will remain and is now anonymized. You have been logged out." });
        }
    }
    catch (error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = request_account_deletion;

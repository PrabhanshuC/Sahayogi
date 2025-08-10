const config = require("../../global_variables");
const Article = require("../../models/Article");
const User = require("../../models/User");

/**
 * @desc    Delete a user and their associated content, or anonymize content
 * @route   DELETE /api/admin/users/:id
 * @access  Admin
 */
const delete_user = async (request, response) =>
{
    try
    {
        const user_id = request.params.id;
        const { delete_content } = request.body; // Expecting { "delete_content": boolean }

        const user_to_delete = await User.findById(user_id);
        if (!user_to_delete) {
            return response.status(404).json({ message: "User not found." });
        }

        if (delete_content === true)
        {
            // Option 1: Delete user and all associated content permanently
            await Article.deleteMany({ author: user_id }); // Delete all articles by this user
            await User.findByIdAndDelete(user_id); // Delete the user account

            response.status(200).json({ message: "User and all associated content deleted." });
        }
        else
        {
            // Option 2: Deactivate user account and anonymize articles
            // REPLACE 'YOUR_ANONYMOUS_USER_ID_HERE' with the actual _id of your anonymous user
            
            await Article.updateMany(
                { author: user_id },
                { $set: { author: config.ANONYMOUS } }
            );

            // Set user status to deactivated
            user_to_delete.status = "deactivated";
            user_to_delete.deletion_scheduled_for = null;
            await user_to_delete.save();

            response.status(200).json({ message: "User account deactivated and content anonymized." });
        }
    }
    catch(error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Server Error" });
    }
};

module.exports = delete_user;

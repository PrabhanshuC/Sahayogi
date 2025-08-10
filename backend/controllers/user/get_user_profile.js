const User = require("../../models/User");

/**
 * @desc    Get the profile of the logged-in user
 * @route   GET /api/users/profile
 * @access  Private
 */
const get_user_profile = async (request, response) =>
{
    try
    {
        const user = await User.findById(request.user.id).select("-password");

        if (!user)
            return response.status(404).json({ message: "User not found" });
        
        response.status(200).json({ user });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Server Error" });
    }
};

module.exports = get_user_profile;

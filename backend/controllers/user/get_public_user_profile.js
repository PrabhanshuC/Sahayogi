const User = require("../../models/User");

/**
 * @desc    Get a public user profile by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const get_public_user_profile = async (request, response) =>
{
    try
    {
        const user_id = request.params.id;
        const user = await User.findById(user_id).select('username email about github website');

        if (!user)
            return response.status(404).json({ message: "User not found" });
        
        response.status(200).json({ user });
    }
    catch(error)
    {
        console.error(error.message);
        
        if (error.kind === "ObjectId")
            return response.status(404).json({ message: "User not found" });

        response.status(500).json({ message: "Server Error" });
    }
};

module.exports = get_public_user_profile;

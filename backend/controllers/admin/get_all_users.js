const User = require("../../models/User");

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Admin
 */
const get_all_users = async (request, response) =>
{
    try
    {
        // Exclude the password field from the user data
        const users = await User.find({}, "-password");
        
        return response.status(200).json(users);
    }
    catch(error)
    {
        console.error(error);
        
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = get_all_users;

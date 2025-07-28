const User = require("../../models/User");

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

module.exports = get_all_users;

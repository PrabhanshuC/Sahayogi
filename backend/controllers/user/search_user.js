const User = require("../../models/User");

/**
 * @desc    Search user profiles (excluding 'admin' and 'system' roles)
 * @route   GET /api/users/search
 * @access  Public
 */
const search_users = async (request, response) =>
{
    try
    {
        const { q } = request.query;

        if (!q)
            return response.status(400).json({ message: "Search query is required." });

        const search_regex = new RegExp(q, 'i');
        const users = await User.find(
            {
                // Add condition to exclude 'admin' and 'system' roles
                role: { $nin: ["admin", "system"] }, 
                $or: [
                    { username: { $regex: search_regex } },
                    { email: { $regex: search_regex } },
                    { about: { $regex: search_regex } }
                ]
            }
        ).select('-password -role -status -deletion_scheduled_for');

        if (!users.length)
            return response.status(404).json({ message: "No users found matching your criteria." });

        response.status(200).json(users);
    }
    catch (error)
    {
        console.error(error);
        response.status(500).json({ message: "An error occurred while searching for users." });
    }
};

module.exports = search_users;

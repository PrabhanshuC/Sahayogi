const User = require("../../models/User");
const bcrypt = require("bcrypt");

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

/**
 * @desc    Update the profile of the logged-in user
 * @route   PUT /api/users/profile
 * @access  Private
 */
const update_user_profile = async (request, response) =>
{
    try
    {
        const { name, email, about, github, website, password } = request.body;

        const user = await User.findById(request.user.id);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        // Update fields if they were provided
        user.name = name || user.name;
        user.email = email || user.email;
        user.about = about || user.about;
        user.github = github || user.github;
        user.website = website || user.website;

        // Update password if a new one was provided
        if (password)
            user.password = await bcrypt.hash(password, 10);

        const updated_user = await user.save();
        
        // Return the updated user without the password
        const user_response = updated_user.toObject();

        delete user_response.password;

        response.status(200).json({ message: "Profile updated successfully", user: user_response });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Server Error" });
    }
};

module.exports =
{
    get_user_profile,
    update_user_profile
};

const config = require("../../global_variables");
const User = require("../../models/User");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @desc    Log in a registered user using username or email
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (request, response) =>
{
    try
    {
        const { uid, password } = request.body;

        const user = await User.findOne(
            {
                $or: [
                    { username: uid },
                    { email: uid }
                ]
            }
        );

        // If no user is found with either username or email
        if(!user)
            return response.status(400).json({ message: "Invalid credentials" });

        // Compare the provided password with the hashed password in the database
        const password_matched = await bcrypt.compare(password, user.password);
        
        if(!password_matched)
            return response.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const jti = uuidv4();
        const payload =
        {
            id: user._id,
            role: user.role,
            jti
        };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

        response.status(200).json({ token });
    }
    catch (err)
    {
        console.error(err.message);
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = login;

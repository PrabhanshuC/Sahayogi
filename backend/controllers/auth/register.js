const config = require("../../global_variables");
const User = require("../../models/User");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (request, response) =>
{
    try
    {
        const
        {
            username,
            password,
            email
        } = request.body;

        const user_exists = await User.findOne({ username });

        if(user_exists)
            return response.status(400).json({ message: "Username already exists" });

        const email_exists = await User.findOne({ email });

        if(email_exists)
            return response.status(400).json({ message: "Email already exists" });
        
        const user = new User(
            {
                username,
                password,
                email
            }
        );

        await user.save();

        const jti = uuidv4();
        const payload =
        {
            id: user._id,
            role: user.role,
            jti
        };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

        response.status(201).json({ token });
    }
    catch (err)
    {
        console.error(err.message);
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = register;

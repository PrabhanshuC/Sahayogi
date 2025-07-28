const config = require("../../global_variables");
const User = require("../../models/User");
const Workspace = require("../../models/Workspace");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (request, response) =>
{
    try
    {
        const
        {
            username,
            password,
            email,
            name,
            about,
            github,
            website
        } = request.body;

        const user_exists = await User.findOne({ $or: [{ username }, { email }] });

        if(user_exists)
            return response.status(400).json({ message: "Username or email already exists" });

        const hashed_password = await bcrypt.hash(password, 10);
        
        const user = new User(
            {
                username,
                password:hashed_password,
                email,
                name,
                about,
                github,
                website
            }
        );

        const private_workspace = new Workspace({
            name: `${username}'s Private Workspace`,
            owner: user._id,
            members: [{ user: user._id, role: "admin" }]
        });

        await private_workspace.save();

        user.private_workspace = private_workspace._id;

        await user.save();

        const jti = uuidv4();
        const payload =
        {
            id: user._id,
            website_role: user.role,
            jti
        };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

        response.status(201).json({ token });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = register;

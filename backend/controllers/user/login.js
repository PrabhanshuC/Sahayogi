const config = require("../../global_variables");
const User = require("../../models/User");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (request, response) =>
{
    try
    {
        const { username, password } = request.body;

        const user = await User.findOne({ username });

        if(!user)
            return response.status(400).json({ message: "Invalid credentials" });

        if (user.status !== "active")
            return response.status(403).json({ message: `Forbidden: This account is currently ${user.status}.` });

        const password_matched = bcrypt.compare(password, user.password);

        if(!password_matched)
            return response.status(400).json({ message: "Invalid credentials" });

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
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = login;

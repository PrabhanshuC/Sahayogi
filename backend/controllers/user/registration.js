const config = require("../../global_variables");
const User = require("../../models/User");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (request, response) =>
{
    try
    {
        const { username, password } = request.body;

        const user_exists = await User.findOne({ username });

        if(user_exists)
            return response.status(400).json({ message: "Username already exists" });

        const hashed_password = bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed_password });

        await user.save();

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

module.exports = register;

const config = require("../global_variables");
const User = require("../models/User");
const Blacklist = require("../models/Blacklist");

const jwt = require("jsonwebtoken");

const authenticate = async (request, response, next) =>
{
    try
    {
        const token = request.header("Authorization")?.split(" ")[1];

        if(!token)
            return response.status(401).json({ message: "No token" });

        const payload = jwt.verify(token, config.JWT_SECRET);

        if(!payload || !payload.jti)
            return response.status(401).json({ message: "Invalid token" });

        const blacklisted = await Blacklist.findOne({ jti: payload.jti });

        if(blacklisted)
            return response.status(401).json({ message: "Invalid token" });

        request.user = await User.findById(payload.id).select("-password");

        if (!request.user)
            return response.status(403).json({ message: "Forbidden: Unauthorized access" });

        next();
    }
    catch(error)
    {
        console.error(error.message);

        response.status(401).json({ message: "Invalid token"});
    }
};

module.exports = authenticate;

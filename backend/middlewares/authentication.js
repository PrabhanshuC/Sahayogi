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

        const blacklisted = await Blacklist.findOne({ jti: payload.jti });

        if(blacklisted)
            return response.status(401).json({ message: "Invalid token" });

        const payload = jwt.verify(token, config.JWT_SECRET);

        if(!payload || !payload.jti)
            return response.status(401).json({ message: "Invalid token" });

        request.user = await User.findById(payload.id).select("-password");

        if (!request.user)
            return res.status(403).json({ message: "Forbidden: Unauthorized access" });

        if (request.user.status !== "active")
            return response.status(403).json({ message: `Forbidden: This account is currently ${request.user.status}.` });

        next();
    }
    catch(error)
    {
        console.error(error.message);

        if (error.name === "TokenExpiredError")
            return response.status(401).json({ message: "Unauthorized: Token has expired" });

        if (error.name === "JsonWebTokenError")
            return response.status(401).json({ message: "Unauthorized: Invalid token" });

        response.status(401).json({ message: "Invalid token"});
    }
};

module.exports = authenticate;

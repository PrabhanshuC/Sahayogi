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

        const blacklisted = Blacklist.findOne({ jti: payload.jti });

        if(blacklisted)
            return response.status(401).json({ message: "Invalid token" });

        request.user = await User.findById(payload.id).select('-password');

        if (!req.user)
            return res.status(403).json({ message: "Forbidden: Unauthorized access" });

        next();
    }
    catch(error)
    {
        console.error(error.message);

        response.status(401).json({ message: "Invalid token"});
    }
};

module.exports = authenticate;


/*
for a free version of an application, what should be uploaded to github and what should not be uploaded
*/
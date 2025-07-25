const Blacklist = require("../../models/Blacklist");

const jwt = require("jsonwebtoken");

const logout = async (request, response) =>
{
    try
    {
        const token = request.header("Authorization")?.split(" ")[1];
    
        if(!token)
            return response.status(400).json({ message: "No token" });

        const payload = jwt.decode(token);

        if(!payload || !payload.jti)
            return response.status(400).json({ message: "Invalid token" });

        const blacklisted = Blacklist.findOne({ jti: payload.jti });

        if(blacklisted)
            return response.status(401).json({ message: "Token is already revoked" });

        const revoked = new Blacklist({ jti: payload.jti });

        await revoked.save();

        response.status(200).json({ message: "Logout successfull" });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = logout;

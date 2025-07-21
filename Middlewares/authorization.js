const config = require("../global_variables");

const jwt = require("jsonwebtoken");

const authorize = (request, response, next) =>
{
    const token = request.header("Authorization")?.split(" ")[1];

    if(!token)
        return response.status(401).json({ message: "No token" });

    try
    {
        const payload = jwt.verify(token, config.JWT_SECRET);

        if(payload.user.role === "admin")
        {
            request.user = payload.user;

            next();
        }

        response.status(401).json({ message: "Unauthorized access" });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports = authorize;

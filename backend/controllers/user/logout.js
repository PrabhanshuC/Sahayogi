const { revoke_token } = require("../../utilities/revoke_token");

const logout = async (request, response) =>
{
    try
    {
        const token = request.header("Authorization")?.split(" ")[1];
    
        revoke_status = await revoke_token(token);

        response.status(revoke_status.status).json({ message: revoke_status.message });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = logout;

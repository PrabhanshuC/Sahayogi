const jwt = require("jsonwebtoken");

const Blacklist = require("../models/Blacklist");

/**
 * @desc    Decodes a JWT and adds its JTI to the blacklist.
 * @param   {string} token The JWT to be revoked.
 * @returns {Promise<void>}
 */
const revoke_token = async (token) =>
{
    try
    {
        if (!token)
            return { status: 400, message: "No token" };

        const payload = jwt.decode(token);

        if(!payload || !payload.jti)
            return { status: 400, message: "Invalid token" };

        const blacklisted = await Blacklist.findOne({ jti: payload.jti });

        if(blacklisted)
            return { status: 401, message: "Token is already revoked" };

        const revoked = new Blacklist({ jti: payload.jti });

        await revoked.save();

        return { status: 200, message: "Success" }
    }
    catch(error)
    {
        console.error(error.message);
    }
};

module.exports = { revoke_token };

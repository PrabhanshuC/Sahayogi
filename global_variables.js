require("dotenv-vault").config();

const config =
{
    PORT: parseInt(process.env.PORT),
    HOSTNAME: process.env.HOSTNAME,

    DATABASE: process.env.MONGODB_URI,

    JWT_SECRET: process.env.JWT_SECRET_KEY
}

module.exports = config;

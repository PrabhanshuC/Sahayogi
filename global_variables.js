require("dotenv-vault").config();

const PORT = parseInt(process.env.PORT, 10) || 10000;

const config =
{
    PORT: PORT,
    HOSTNAME: process.env.HOSTNAME,

    DATABASE: process.env.MONGODB_URI,

    JWT_SECRET: process.env.JWT_SECRET_KEY
}

console.log(config.PORT)
console.log(config.HOSTNAME)
console.log(config.DATABASE)
// console.log(config.)

module.exports = config;

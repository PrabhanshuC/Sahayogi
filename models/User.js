const { Schema } = require("mongoose");

const User_Schema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        },
        role:
        {
            type: ["user", "admin"],
            required: true,
            default: "user"
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        name:
        {
            type: String
        },
        about:
        {
            type: String
        },
        github:
        {
            type: String,
            unique: true
        },
        website:
        {
            type: String,
            unique: true
        }
    }
);

module.exports = User_Schema;

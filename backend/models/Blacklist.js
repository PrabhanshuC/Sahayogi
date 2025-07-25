const { Schema } = require("mongoose");

const Blacklist_Schema = new Schema(
    {
        jti:
        {
            type: String,
            required: true,
            unique: true
        },
        createdAt:
        {
            type: Date,
            required: true,
            default: Date.now,
            expires: '7d'
        }
    }
);

module.exports = Blacklist_Schema;

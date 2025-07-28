const { model, Schema } = require("mongoose");

const Blacklist_Schema = new Schema(
    {
        jti:
        {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        createdAt:
        {
            type: Date,
            required: true,
            default: Date.now,
            expires: "7d"
        }
    }
);

module.exports = model("Blacklist", Blacklist_Schema);

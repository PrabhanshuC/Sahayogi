const { Schema } = require("mongoose");

const Article_Schema = new Schema(
    {
        heading:
        {
            type: String,
            required: true
        },
        body:
        {
            type: String,
            required: true
        },
        author:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags:
        {
            type: [String],
            required: true
        },
        likes:
        {
            type: Number,
            default: 0
        }
    }
);

module.exports = Article_Schema;

const { model, Schema } = require("mongoose");

const Article_Schema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        content:
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
            default: []
        },
        likes:
        {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = model("Article", Article_Schema);

const { Schema } = require("mongoose");

const Resource_Schema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        type:
        {
            type: String,
            enum: ["article", "markdown", "html", "uml", "pathway"],
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
            required: true
        },
        workspace:
        {
            type: Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        isPublic:
        {
            type: Boolean,
            default: false
        },
        likes:
        {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = Resource_Schema;

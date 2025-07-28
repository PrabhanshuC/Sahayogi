const { model, Schema } = require("mongoose");

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
            default: ''
        },
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags:
        {
            type: [String]
        },
        members:
        [{
            user:
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            role:
            {
                type: String,
                enum: ["editor", "viewer"],
                default: "viewer"
            }
        }],
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

module.exports = model("Resource", Resource_Schema);

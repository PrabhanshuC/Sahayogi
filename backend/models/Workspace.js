const { Schema } = require("mongoose");

const Workspace_Schema = new Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
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
                enum: ["admin", "editor", "viewer"],
                default: "viewer"
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workspace", Workspace_Schema);

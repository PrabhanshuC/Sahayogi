const { model, Schema } = require("mongoose");

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
        }],
        status:
        {
            type: String,
            enum: ["active", "pending_deletion"],
            default: "active"
        },
        deletion_scheduled_for:
        {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = model("Workspace", Workspace_Schema);

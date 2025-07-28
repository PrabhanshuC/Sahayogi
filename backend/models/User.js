const { model, Schema } = require("mongoose");

const User_Schema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password:
        {
            type: String,
            required: true
        },
        website_role:
        {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: { type: String },
        about: { type: String },
        github:
        {
            type: String,
            unique: true,
            sparse: true
        },
        website:
        {
            type: String,
            unique: true,
            sparse: true
        },
        private_workspace:
        {
            type: Schema.Types.ObjectId,
            ref: "Workspace"
        },
        status:
        {
            type: String,
            enum: ["active", "deactivated", "pending_deletion"],
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

module.exports = model("User", User_Schema);

const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

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
            type: String,
            enum: ["user", "admin", "system"],
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
            type: String,
            default: ""
        },
        about:
        {
            type: String,
            default: ""
        },
        github:
        {
            type: String,
            default: ""
        },
        website:
        {
            type: String,
            default: ""
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
    }
);

// Pre-save hook to hash password before saving
User_Schema.pre("save", async function (next)
{
    if (!this.isModified("password"))
        return next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = model("User", User_Schema);

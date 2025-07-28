/** This script is intended to be run periodically by a scheduler (e.g., a cron job). */
const connect_db = require(path.join(__dirname, "../config/database"));

const mongoose = require("mongoose");
const path = require("path");

// Model Imports
const User = require(path.join(__dirname, "../models/User"));
const Workspace = require(path.join(__dirname, "../models/Workspace"));
const Resource = require(path.join(__dirname, "../models/Resource"));

const perform_cleanup = async () =>
{
    try
    {
        console.log("Starting cleanup process...");

        const now = new Date();

        // Find and delete USERS scheduled for deletion
        const users_to_delete = await User.find(
            {
                status: "pending_deletion",
                deletion_scheduled_for: { $lte: now }
            }
        );

        if (users_to_delete.length > 0)
        {
            console.log(`Found ${users_to_delete.length} user(s) to permanently delete.`);
            for (const user of users_to_delete)
            {
                console.log(`- Deleting user: ${user.username} (ID: ${user._id})`);

                // Delete all content owned by this user
                await Workspace.deleteMany({ owner: user._id });
                await Resource.deleteMany({ author: user._id });
                // Finally, delete the user document itself
                await User.findByIdAndDelete(user._id);
            }
        }
        else
            console.log("No users are scheduled for deletion at this time.");

        // Find and delete WORKSPACES scheduled for deletion
        const workspaces_to_delete = await Workspace.find(
            {
                status: "pendingDeletion",
                deletionScheduledFor: { $lte: now }
            }
        );

        if (workspaces_to_delete.length > 0)
        {
            console.log(`Found ${workspaces_to_delete.length} workspace(s) to permanently delete.`);

            for(const workspace of workspaces_to_delete)
            {
                console.log(`- Deleting workspace: ${workspace.name} (ID: ${workspace._id})`);

                // Delete all resources contained within this workspace
                await Resource.deleteMany({ workspace: workspace._id });
                // Finally, delete the workspace document
                await Workspace.findByIdAndDelete(workspace._id);
            }
        }
        else
            console.log("No workspaces are scheduled for deletion at this time.");

        console.log("Cleanup process completed successfully.");

    }
    catch(error)
    {
        console.error("An error occurred during the cleanup process:", error);
    }
};

const run = async () =>
{
    try
    {
        await connect_db();
        
        await perform_cleanup();
    }
    catch(error)
    {
        console.error("Failed to run the cleanup script:", error);
    }
    finally
    {
        console.log("Disconnecting from the database.");

        await mongoose.disconnect();
    }
};

run();

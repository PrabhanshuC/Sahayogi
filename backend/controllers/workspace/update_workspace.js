const Workspace = require("../../models/Workspace");

const update_workspace = async (request, response) =>
{
    try
    {
        const { name, owner, members } = request.body;

        const workspace = await Workspace.findOneAndUpdate(
            { _id: request.params.id, author: request.user.id },
            {
                name,
                owner,
                members
            }
        );

        response.status(201).json({ workspace });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = update_workspace;

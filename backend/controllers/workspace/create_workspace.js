const Workspace = require("../../models/Workspace");

const create_workspace = async (request, response) =>
{
    try
    {
        const { name, owner, members } = request.body;

        const workspace = new Workspace(
            {
                name,
                owner,
                members
            }
        );

        await workspace.save();

        response.status(201).json({ workspace });
    }
    catch(error)
    {
        console.error(error.message);

        response.status(500).json({ message: "Internal server error" });
    }
}

module.exports = create_workspace;

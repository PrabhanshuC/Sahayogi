const Workspace = require("../../models/Workspace");

const create_workspace = async (request, response) =>
{
    try
    {
        const { name } = request.body;

        const owner_id = request.user.id;

        const workspace = new Workspace(
            {
                name,
                owner: owner_id,
                members: [{ user: owner_id, role: 'admin' }]
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

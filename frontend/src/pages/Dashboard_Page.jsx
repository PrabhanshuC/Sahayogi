import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { api_request } from "../api";

export const Dashboard_Page = () =>
{
    const [workspaces, set_workspaces] = useState([]);
    const [loading, set_loading] = useState(true);
    const { token } = useAuth();

    useEffect(
        () =>
        {
            if (token)
            {
                api_request("/api/workspaces", "GET", null, token)
                    .then(data => set_workspaces(data.workspaces))
                    .catch(err => console.error(err))
                    .finally(() => set_loading(false));
            }
        }, [token]
    );

    const handle_create_workspace = async () =>
    {
        const name = prompt("Enter new workspace name:");

        if(name)
        {
            try
            {
                const data = await api_request("/api/workspaces", "POST", { name }, token);
                set_workspaces([...workspaces, data.workspace]);
            }
            catch(error)
            {
                alert("Error creating workspace: " + error.message);
            }
        }
    };

    if (loading) return <main><p>Loading...</p></main>;

    return (
        <main>
            <article className="content">
                <header className="content-header"><h1>Your Dashboard</h1></header>
                <div className="content-body">
                    <button onClick={handle_create_workspace} className="button primary">Create New Workspace</button>
                    <h2>Your Workspaces</h2>
                    { workspaces.length > 0 ? (
                        <ul className="workspace-list">
                            { workspaces.map(ws => <li key={ws._id}><Link to={`/workspaces/${ws._id}`}>{ws.name}</Link></li>) }
                        </ul>
                    ) : <p>You haven"t created any workspaces yet.</p> }
                </div>
            </article>
        </main>
    );
};

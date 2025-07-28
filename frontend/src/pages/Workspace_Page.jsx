import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

export const Workspace_Page = () =>
{
    const { id: workspace_id } = useParams();
    const [workspace, set_workspace] = useState(null);
    const [resources, set_resources] = useState([]);
    const [loading, set_loading] = useState(true);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const is_private_workspace = user?.private_workspace === workspace_id;

    useEffect(
        () =>
        {
            if (token && workspace_id)
            {
                Promise.all([
                    api_request(`/api/workspaces/${workspace_id}`, 'GET', null, token),
                    api_request(`/api/workspaces/${workspace_id}/resources`, 'GET', null, token)
                ]).then(([ws_data, res_data]) =>
                    {
                        set_workspace(ws_data.workspace);
                        set_resources(res_data.resources || []);
                    }
                ).catch(err => console.error(err)).finally(() => set_loading(false));
            }
        },
        [token, workspace_id]
    );

    const handle_delete_workspace = async () =>
    {
        if (window.confirm("Are you sure you want to delete this workspace and all its private resources?"))
        {
            try
            {
                await api_request(`/api/workspaces/${workspace_id}`, 'DELETE', null, token);

                navigate('/dashboard');
            }
            catch(error)
            {
                alert("Error deleting workspace: " + error.message);
            }
        }
    };

    if (loading) return <main><p>Loading workspace...</p></main>;
    if (!workspace) return <main><p>Workspace not found.</p></main>;

    return (
        <main>
            <article className="content">
                <header className="content-header"><h1>{workspace.name}</h1></header>
                <div className="content-body">
                    <Link to={`/workspaces/${workspace_id}/create-resource`} className="button primary">Create New Resource</Link>
                    <h2>Resources</h2>
                    {resources.length > 0 ? (
                        <ul className="resource-list">
                            {resources.map(res => <li key={res._id}><Link to={`/resources/${res._id}`}>{res.title}</Link> ({res.type})</li>)}
                        </ul>
                    ) : <p>No resources here yet.</p>}
                </div>
            </article>

            {/* Conditionally render the management section */}
            {!is_private_workspace && (
                 <article className="content">
                    <header className="content-header"><h2>Manage Workspace</h2></header>
                    <div className="content-body">
                        <h3>Members</h3>
                        {/* Member management UI would go here */}
                        <p>Member list and add/remove form.</p>
                        <hr />
                        <h3>Danger Zone</h3>
                        <button onClick={handle_delete_workspace} className="button secondary">Delete Workspace</button>
                    </div>
                </article>
            )}
        </main>
    );
};

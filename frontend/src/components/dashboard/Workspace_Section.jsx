import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { api_request } from "../../api";
import { Modal } from "../common/Modal";
import { Create_Workspace_Form } from "../workspace/Create_Workspace_Form";

export const Workspace_Section = () =>
{
    const [workspaces, set_workspaces] = useState([]);
    const [loading, set_loading] = useState(true);
    const [is_modal_open, set_is_modal_open] = useState(false);
    const [editing_workspace, set_editing_workspace] = useState(null);
    const { user, token } = useAuth();

    const fetch_workspaces = () =>
    {
        if(token)
        {
            api_request("/api/workspaces", "GET", null, token)
                .then(data => set_workspaces(data.workspaces))
                .catch(err => console.error(err))
                .finally(() => set_loading(false));
        }
    };

    useEffect(fetch_workspaces, [token]);

    const handle_form_submit = async (workspace_data) =>
    {
        try
        {
            if (editing_workspace)
                await api_request(`/api/workspaces/${editing_workspace._id}`, "PUT", workspace_data, token);
            else
                await api_request("/api/workspaces", "POST", workspace_data, token);
            
            fetch_workspaces();
        }
        catch(error)
        {
            alert("Error: " + error.message);
        }
        finally
        {
            set_is_modal_open(false);
            set_editing_workspace(null);
        }
    };
    
    const handle_delete = async (workspace_id) =>
    {
        if (window.confirm("Are you sure you want to delete this workspace?"))
        {
            try
            {
                await api_request(`/api/workspaces/${workspace_id}`, "DELETE", null, token);
                fetch_workspaces();
            }
            catch(error)
            {
                alert("Error deleting workspace: " + error.message);
            }
        }
    };

    const open_create_modal = () =>
    {
        set_editing_workspace(null);
        set_is_modal_open(true);
    };

    const open_edit_modal = (workspace) =>
    {
        set_editing_workspace(workspace);
        set_is_modal_open(true);
    };

    return (
        <article className="content">
            <header className="content-header">
                <h2>Workspaces</h2>
            </header>
            <div className="content-body">
                <button onClick={open_create_modal} className="button primary">Create New Workspace</button>
                { loading ? <p>Loading...</p> : (
                    workspaces.length > 0 ? (
                        <>
                            {workspaces.map(ws => (
                                <article key={ws._id} className="content-section">
                                    <h3 className="content-section-header">
                                        <Link to={`/workspaces/${ws._id}`}>{ws.name}</Link>
                                    </h3>
                                    <div className="content-section-body">
                                        { user && ws._id !== user.private_workspace && (
                                            <div className="card-actions">
                                                <button onClick={() => open_edit_modal(ws)} className="button secondary">Edit</button>
                                                <button onClick={() => handle_delete(ws._id)} className="button danger">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </>
                    ) : <p>You haven't created any workspace yet.</p>
                )}
                { is_modal_open && (
                    <Modal on_close={() => set_is_modal_open(false)}>
                        <h2>{editing_workspace ? "Edit Workspace" : "Create Workspace"}</h2>
                        <Create_Workspace_Form
                            workspace={editing_workspace}
                            on_submit={handle_form_submit}
                            on_cancel={() => set_is_modal_open(false)}
                        />
                    </Modal>
                )}
            </div>
        </article>
    );
};

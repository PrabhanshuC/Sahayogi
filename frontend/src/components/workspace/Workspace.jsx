import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';
import { Modal } from '../common/Modal';
import { Delete_Modal } from '../common/Delete_Modal';
import { Resource_Form } from '../resource/Resource_Form';

export const Workspace = () =>
{
    const { id: workspace_id } = useParams();
    const [workspace, set_workspace] = useState(null);
    const [resources, set_resources] = useState([]);
    const [loading, set_loading] = useState(true);
    const { user, token } = useAuth();

    const [modal_state, set_modal_state] = useState({ type: null, resource: null });

    const is_private_workspace = user?.private_workspace === workspace_id;

    const fetch_data = useCallback(() =>
        {
            if (token && workspace_id) {
                set_loading(true);
                Promise.all([
                    api_request(`/api/workspaces/${workspace_id}`, 'GET', null, token),
                    api_request(`/api/workspaces/${workspace_id}/resources`, 'GET', null, token)
                ]).then(([ws_data, res_data]) => {
                    set_workspace(ws_data.workspace);
                    set_resources(res_data.resources || []);
                }).catch(err => console.error(err)).finally(() => set_loading(false));
            }
        },
        [token, workspace_id]
    );

    useEffect(fetch_data, [fetch_data]);

    const handle_create_resource = async (resource_data) =>
    {
        try
        {
            const submission_data = { ...resource_data, type: 'markdown' };

            await api_request(`/api/workspaces/${workspace_id}/resources`, 'POST', submission_data, token);

            fetch_data();
        }
        catch(error)
        {
            alert("Error creating resource: " + error.message);
        }
        finally
        {
            set_modal_state({ type: null, resource: null });
        }
    };

    const handle_delete_resource = async () =>
    {
        try
        {
            await api_request(`/api/resources/${modal_state.resource._id}`, 'DELETE', null, token);

            fetch_data();
        }
        catch(error)
        {
            alert("Error deleting resource: " + error.message);
        }
        finally
        {
            set_modal_state({ type: null, resource: null });
        }
    };

    if (loading) return <main><p>Loading workspace...</p></main>;
    if (!workspace) return <main><p>Workspace not found.</p></main>;

    const public_resources = resources.filter(r => r.isPublic);
    const private_resources = resources.filter(r => !r.isPublic);

    return (
        <main>
            <header className="page-title">
                <h1>{workspace.name}</h1>
            </header>
            <div className="workspace-layout">
                <div className="workspace-main">
                    <article className="content">
                        <header className="content-header">
                            <h2>Resources</h2>
                        </header>
                        <div className="content-body">
                            <button onClick={() => set_modal_state({ type: 'create' })} className="button primary">
                                Create New Resource
                            </button>
                            <div className="resource-category">
                                <h3>Shared Resources</h3>
                                {public_resources.length > 0 ? (
                                    <ul className="resource-list">
                                        {public_resources.map(res => (
                                            <li key={res._id} className="resource-item">
                                                <Link to={`/resources/${res._id}`}>{res.title}</Link>
                                                <div className="item-actions">
                                                    <button onClick={() => set_modal_state({ type: 'delete', resource: res })} className="button danger">Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p>No shared resources yet.</p>}
                            </div>
                            <div className="resource-category">
                                <h3>Private Resources</h3>
                                {private_resources.length > 0 ? (
                                    <ul className="resource-list">
                                        {private_resources.map(res => (
                                            <li key={res._id} className="resource-item">
                                                <Link to={`/resources/${res._id}`}>{res.title}</Link>
                                                <div className="item-actions">
                                                    <button onClick={() => set_modal_state({ type: 'delete', resource: res })} className="button danger">Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p>No private resources yet.</p>}
                            </div>
                        </div>
                    </article>
                </div>
                <aside className="workspace-sidebar">
                    <h3>Members</h3>
                    <ul className="members-list">
                        {workspace.members.map(member => (
                            <li key={member.user._id} className="member-item">
                                {member.user.username} ({member.role})
                            </li>
                        ))}
                    </ul>
                    {!is_private_workspace && (
                        <>
                            <hr/>
                            <h3>Manage Workspace</h3>
                            <p>Member management UI goes here.</p>
                            <button className="button danger">Delete Workspace</button>
                        </>
                    )}
                </aside>
            </div>

            {modal_state.type === 'create' && (
                <Modal on_close={() => set_modal_state({ type: null })}>
                    <h2>Create New Resource</h2>
                    <Resource_Form
                        on_submit={handle_create_resource}
                        on_cancel={() => set_modal_state({ type: null })}
                    />
                </Modal>
            )}

            {modal_state.type === 'delete' && (
                <Delete_Modal
                    item_name={modal_state.resource.title}
                    on_confirm={handle_delete_resource}
                    on_cancel={() => set_modal_state({ type: null })}
                />
            )}
        </main>
    );
};

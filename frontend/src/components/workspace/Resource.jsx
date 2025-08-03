import React, { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';
import { Modal } from '../common/Modal';
import { Delete_Modal } from '../common/Delete_Modal';
import { Resource_Form } from '../resource/Resource_Form';

export const Resource = ({ workspace, initial_resources, on_resource_change }) =>
{
    const { token } = useAuth();
    const [modal_state, set_modal_state] = useState({ type: null, resource: null });

    const handle_form_submit = async (resource_data) =>
    {
        try
        {
            let submission_data = { ...resource_data, type: 'markdown' };

            if (modal_state.type === 'edit')
                await api_request(`/api/resources/${modal_state.resource._id}`, 'PUT', submission_data, token);
            else
            {
                submission_data.workspace = workspace._id;
                await api_request(`/api/workspaces/${workspace._id}/resources`, 'POST', submission_data, token);
            }
            
            on_resource_change();
        }
        catch(error)
        {
            alert("Error: " + error.message);
        }
        finally
        {
            set_modal_state({ type: null, resource: null });
        }
    };

    const handle_delete = async () => {
        try {
            await api_request(`/api/resources/${modal_state.resource._id}`, 'DELETE', null, token);
            on_resource_change();
        } catch (error) {
            alert("Error deleting resource: " + error.message);
        } finally {
            set_modal_state({ type: null, resource: null });
        }
    };

    const public_resources = initial_resources.filter(r => r.isPublic);
    const private_resources = initial_resources.filter(r => !r.isPublic);

    return (
        <article className="content">
            <header className="content-header">
                <h2>Resources</h2>
            </header>
            <div className="content-body">
                <button onClick={() => set_modal_state({ type: 'create', resource: null })} className="button primary">
                    Create New Resource
                </button>

                <div className="resource-category">
                    <h3>Shared Resources</h3>
                    {public_resources.length > 0 ? (
                        <ul className="resource-list">
                            {public_resources.map(res => (
                                <li key={res._id} className="resource-item">
                                    <span>{res.title}</span>
                                    <div className="item-actions">
                                        <button onClick={() => set_modal_state({ type: 'edit', resource: res })} className="button secondary">Edit</button>
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
                                    <span>{res.title}</span>
                                    <div className="item-actions">
                                        <button onClick={() => set_modal_state({ type: 'edit', resource: res })} className="button secondary">Edit</button>
                                        <button onClick={() => set_modal_state({ type: 'delete', resource: res })} className="button danger">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No private resources yet.</p>}
                </div>
            </div>

            {(modal_state.type === 'create' || modal_state.type === 'edit') && (
                <Modal on_close={() => set_modal_state({ type: null, resource: null })}>
                    <h2>{modal_state.type === 'edit' ? 'Edit Resource' : 'Create Resource'}</h2>
                    <Resource_Form
                        resource={modal_state.resource}
                        on_submit={handle_form_submit}
                        on_cancel={() => set_modal_state({ type: null, resource: null })}
                    />
                </Modal>
            )}

            {modal_state.type === 'delete' && (
                <Delete_Modal
                    item_name={modal_state.resource.title}
                    on_confirm={handle_delete}
                    on_cancel={() => set_modal_state({ type: null, resource: null })}
                />
            )}
        </article>
    );
};

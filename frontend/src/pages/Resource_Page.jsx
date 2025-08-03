import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import "../styles/resource.css"

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';
import { Resource_Form } from '../components/resource/Resource_Form';

export const Resource_Page = () =>
{
    const { id: resource_id } = useParams();
    const { user, token } = useAuth();
    
    const [resource, set_resource] = useState(null);
    const [is_editing, set_is_editing] = useState(false);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    const fetch_resource = useCallback(() =>
        {
            if (token && resource_id)
            {
                set_loading(true);

                api_request(`/api/resources/${resource_id}`, 'GET', null, token)
                    .then(data => set_resource(data.resource))
                    .catch(error => set_error('Failed to load resource.', error))
                    .finally(() => set_loading(false));
            }
        },
        [token, resource_id]
    );

    useEffect(fetch_resource, [fetch_resource]);

    const handle_update = async (resource_data) =>
    {
        try
        {
            await api_request(`/api/resources/${resource_id}`, 'PUT', resource_data, token);

            set_is_editing(false);

            fetch_resource();
        }
        catch(err)
        {
            alert("Error updating resource: " + err.message);
        }
    };

    if (loading) return <main><p>Loading resource...</p></main>;
    if (error) return <main><p className="error-message">{error}</p></main>;
    if (!resource) return <main><p>Resource not found.</p></main>;

    const is_owner = user?._id === resource.author;

    return (
        <main>
            <div className="resource-page-layout">
                {is_editing ? (
                    <article className="content">
                        <header className="content-header"><h1>Edit Resource</h1></header>
                        <Resource_Form 
                            resource={resource}
                            on_submit={handle_update}
                            on_cancel={() => set_is_editing(false)}
                        />
                    </article>
                ) : (
                    <article>
                        <header className="resource-header">
                            <h1>{resource.title}</h1>
                            <div className="resource-actions">
                                <button className="button secondary">Save</button>
                                <button className="button secondary">Share</button>
                                {is_owner && (
                                    <button onClick={() => set_is_editing(true)} className="button primary">Edit</button>
                                )}
                            </div>
                        </header>
                        <div className="resource-content-display">
                            {resource.content}
                        </div>
                        <footer className="resource-footer">
                            <p>Tags: {Array.isArray(resource.tags) ? resource.tags.join(', ') : ''}</p>
                        </footer>
                    </article>
                )}
            </div>
        </main>
    );
};

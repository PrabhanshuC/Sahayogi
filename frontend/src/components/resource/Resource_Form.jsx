import React, { useState, useEffect } from 'react';

export const Resource_Form = ({ resource, on_submit, on_cancel }) =>
{
    const [form_data, set_form_data] = useState(
        {
            title: '',
            content: '',
            tags: ''
        }
    );

    useEffect(
        () =>
        {
            if (resource)
            {
                set_form_data(
                    {
                        title: resource.title || '',
                        content: resource.content || '',
                        tags: Array.isArray(resource.tags) ? resource.tags.join(', ') : ''
                    }
                );
            }
        },
        [resource]
    );

    const handle_change = (e) =>
    {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    };

    const handle_submit = (e) =>
    {
        e.preventDefault();

        const submission_data =
        {
            ...form_data,
            tags: form_data.tags.split(',').map(tag => tag.trim())
        };

        on_submit(submission_data);
    };

    return (
        <form onSubmit={handle_submit} className="content-body">
            <div className="row">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={form_data.title} onChange={handle_change} placeholder="Resource Title" required />
            </div>
            <div className="row">
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" value={form_data.content} onChange={handle_change} placeholder="Something interesting..." rows="15" required></textarea>
            </div>
            <div className="row">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input type="text" id="tags" name="tags" value={form_data.tags} onChange={handle_change} placeholder="e.g., react, node, api" />
            </div>
            <div className="row form-actions">
                <button type="submit" className="button primary">Save</button>
                <button type="button" onClick={on_cancel} className="button secondary">Cancel</button>
            </div>
        </form>
    );
};

import React, { useState, useEffect } from "react";

export const Create_Workspace_Form = ({ workspace, on_submit, on_cancel }) =>
{
    const [name, set_name] = useState("");

    useEffect(
        () =>
        {
            if (workspace)
                set_name(workspace.name);
        },
        [workspace]
    );

    const handle_submit = (e) =>
    {
        e.preventDefault();

        on_submit({ name });
    };

    return (
        <article className="content">
            <h1>Create Workspace</h1>
            <form onSubmit={handle_submit}>
                <div className="row">
                    <label htmlFor="workspace-name">Workspace Name</label>
                </div>
                <div className="row">
                    <input
                        id="workspace-name"
                        type="text"
                        value={name}
                        onChange={(e) => set_name(e.target.value)}
                        placeholder="My New Project"
                        required
                    />
                </div>
                <div className="row form-actions">
                    <button type="submit" className="button primary">Save</button>
                    <button type="button" onClick={on_cancel} className="button secondary">Cancel</button>
                </div>
            </form>
        </article>
    );
};

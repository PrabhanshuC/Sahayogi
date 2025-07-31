import React, { useState, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import { api_request } from "../../api";

export const Account = () =>
{
    const [form_data, set_form_data] = useState({});
    const [loading, set_loading] = useState(true);
    const [message, set_message] = useState("");
    const { user, token } = useAuth();

    useEffect(() =>
    {
        if (user)
        {
            set_form_data({
                username: user.username || "", email: user.email || "", name: user.name || "",
                about: user.about || "", github: user.github || "", website: user.website || ""
            });
            set_loading(false);
        }
    }, [user]);

    const handle_change = (e) => set_form_data({ ...form_data, [e.target.name]: e.target.value });

    const handle_submit = async (e) =>
    {
        e.preventDefault();
        set_message("");

        try
        {
            await api_request("/api/users/profile", "PUT", form_data, token);
            set_message("Profile updated successfully!");
        }
        catch(err)
        {
            set_message("Failed to update profile: " + err.message);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="page-section">
            <article className="content">
                <h1>Manage Your Account</h1>
                <form onSubmit={handle_submit}>
                    <fieldset className="fieldset">
                        <legend>Account Information</legend>
                        <div className="row"><label htmlFor="username">Username</label><input type="text" id="username" name="username" value={form_data.username} onChange={handle_change} required /></div>
                        <div className="row"><label htmlFor="password">New Password</label><input type="password" id="password" name="password" onChange={handle_change} placeholder="Leave blank to keep current" /></div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend>Personal Information</legend>
                        <div className="row"><label htmlFor="email">Email</label><input type="email" id="email" name="email" value={form_data.email} onChange={handle_change} required /></div>
                        <div className="row"><label htmlFor="name">Name</label><input type="text" id="name" name="name" value={form_data.name} onChange={handle_change} /></div>
                        <div className="row"><label htmlFor="about">About</label><textarea id="about" name="about" rows="5" value={form_data.about} onChange={handle_change}></textarea></div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend>Work Information</legend>
                        <div className="row"><label htmlFor="github">GitHub</label><input type="url" id="github" name="github" value={form_data.github} onChange={handle_change} /></div>
                        <div className="row"><label htmlFor="website">Website</label><input type="url" id="website" name="website" value={form_data.website} onChange={handle_change} /></div>
                    </fieldset>
                    <div className="row">
                        <button type="submit" className="button primary">Save Changes</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </article>
        </div>
    );
};

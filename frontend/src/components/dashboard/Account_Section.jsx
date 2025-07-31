import React from "react";
import { Link } from "react-router-dom";

export const Account_Section = () =>
{
    return (
        <article className="content">
            <header className="content-header">
                <h2>Account</h2>
            </header>
            <div className="content-body">
                <Link to="/account" className="focus">Manage Profile</Link>
                <Link to="/account/settings" className="focus">Settings</Link>
                <Link to="/account/billing" className="focus">Billing</Link>
            </div>
        </article>
    );
};

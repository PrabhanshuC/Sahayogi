import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export const Header = () =>
{
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [search_query, set_search_query] = useState("");

    const handle_search_submit = (e) =>
    {
        e.preventDefault();

        if (search_query.trim())
            navigate(`/search?q=${encodeURIComponent(search_query.trim())}`);
    };

    return (
        <header className="page-heading">
            <h2><Link to="/">Sahayogi</Link></h2>
            <form onSubmit={handle_search_submit} className="search-bar">
                <input
                    type="search"
                    placeholder="Search resources..."
                    value={search_query}
                    onChange={(e) => set_search_query(e.target.value)}
                />
            </form>
            <nav className="navigation">
                <Link to="/guides">Guides</Link>
                <Link to="/pathways">Pathways</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/account">Account</Link>
                        <button onClick={() => { logout(); navigate("/"); }} className="secondary">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Get Started</Link>
                )}
            </nav>
        </header>
    );
};

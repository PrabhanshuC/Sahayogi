import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export const Header = () =>
{
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="page-heading">
            <h2><Link to="/">Sahayogi</Link></h2>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="/article/search">Articles</Link>
                <Link to="/article/guides">Guides</Link>
                <Link to="/article/paths">Pathways</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/account">Account</Link>
                        <button onClick={() => { logout(); navigate('/'); }} className="secondary">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Get Started</Link>
                )}
            </nav>
        </header>
    );
};

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../styles/login.css"

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

export const Login_Page = () =>
{
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [error, set_error] = useState(null);
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(
        () =>
        {
            if(user)
                navigate('/dashboard');
        },
        [user, navigate]
    );

    const handle_login = async (e) =>
    {
        e.preventDefault();
        set_error(null);

        try
        {
            const data = await api_request('/api/auth/login', 'POST', { username, password });

            login(data.token);

            navigate('/dashboard');
        }
        catch(error)
        {
            set_error(error.message);
        }
    };

    return (
        <main id="login">
            <article className="content">
                <header className="content-header">
                    <h1>Login</h1>
                </header>
                <form id="login-form" onSubmit={handle_login} className="content-body">
                    <div className="row">
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={ username }
                            onChange={ (e) => set_username(e.target.value) } 
                            required 
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="row">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={ password }
                            onChange={(e) => set_password(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="row">
                        <button type="submit" className="primary">Submit</button>
                    </div>
                </form>
                <footer className="content-footer">
                    { error && <p className="error-message">{error}</p> }
                    <p>New to our platform? Create an account <Link to="/register">here</Link></p>
                </footer>
            </article>
        </main>
    );
};

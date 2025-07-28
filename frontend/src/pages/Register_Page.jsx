import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../styles/register.css";

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

export const Register_Page = () =>
{
    const [form_data, set_form_data] = useState({
        username: '', password: '', email: '', name: '', about: '', github: '', website: ''
    });
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

    const handle_change = (e) =>
    {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    };

    const handle_register = async (e) =>
    {
        e.preventDefault();
        set_error(null);

        try
        {
            const data = await api_request('/api/auth/register', 'POST', form_data);
            login(data.token);
            navigate('/dashboard');
        }
        catch(err)
        {
            set_error(err.message);
        }
    };

    return (
        <main id="register">
            <article className="content">
                <header className="content-header"><h1>Register</h1></header>
                <form id="register" onSubmit={handle_register} className="content-body">
                    <fieldset className="fieldset">
                        <legend>Account Information</legend>
                        <div className="row">
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="row">
                            <input type="text" id="username" name="username" onChange={handle_change} placeholder="Username" required />
                        </div>
                        <div className="row">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="row">
                            <input type="password" id="password" name="password" onChange={handle_change} placeholder="Password" required />
                            </div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend>Personal Information</legend>
                        <div className="row">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="row">
                            <input type="email" id="email" name="email" onChange={handle_change} placeholder="Your email address" required />
                        </div>
                        <div className="row">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="row">
                            <input type="text" id="name" name="name" onChange={handle_change} placeholder="Your name" />
                        </div>
                        <div className="row">
                            <label htmlFor="about">About</label>
                        </div>
                        <div className="row">
                            <textarea id="about" name="about" rows="5" onChange={handle_change} placeholder="About"></textarea>
                        </div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend>Work Information</legend>
                        <div className="row">
                            <label htmlFor="github">GitHub</label>
                        </div>
                        <div className="row">
                            <input type="url" id="github" name="github" onChange={handle_change} placeholder="https://github.com/your-profile" />
                        </div>
                        <div className="row">
                            <label htmlFor="website">Website</label>
                        </div>
                        <div className="row">
                            <input type="url" id="website" name="website" onChange={handle_change} placeholder="your-website.tld" />
                        </div>
                    </fieldset>
                    <div className="row">
                        <button type="submit" className="button primary">Submit</button>
                        <button type="reset" className="button secondary">Reset</button>
                    </div>
                </form>
                <footer className="content-footer">
                    {error && <p className="error-message">{error}</p>}
                    <p>Already have an account? Login <Link to="/login">here</Link></p>
                </footer>
            </article>
        </main>
    );
};

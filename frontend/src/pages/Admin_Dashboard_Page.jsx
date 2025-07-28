import React, { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

export const Admin_Dashboard_Page = () =>
{
    const [users, set_users] = useState([]);
    const [loading, set_loading] = useState(true);
    const { token } = useAuth();

    useEffect(
        () =>
        {
            if (token)
            {
                api_request('/api/admin/users', 'GET', null, token)
                    .then(data => set_users(data.users))
                    .catch(err => console.error(err))
                    .finally(() => set_loading(false));
            }
        }, [token]
    );

    if (loading) return <main><p>Loading users...</p></main>;

    return (
        <main>
            <article className="content">
                <header className="content-header"><h1>Admin Dashboard</h1></header>
                <div className="content-body">
                    <h2>All Users</h2>
                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user._id}>
                                {user.username} ({user.email}) - Status: {user.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </main>
    );
};

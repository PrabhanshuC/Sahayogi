import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export const Protected_Route = ({ children, required_role }) =>
{
    const { user, token } = useAuth();

    if (!user && token) return <main><p>Loading...</p></main>;

    if (!user)
        return <Navigate to="/login" />;

    if (required_role && user.role !== required_role)
        return <Navigate to="/dashboard" />;

    return children;
};

import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../feedback/Loading"; // Corrected import path

export const Protected_Route = ({ children }) =>
{
    const { user, loading } = useAuth();

    if (loading) return <Loading message="Authenticating..." />;

    if (!user) return <Navigate to="/login" />;

    return children;
};

import React, { useState, useEffect, createContext } from "react";
import { api_request } from "../api";
import { useNavigate } from 'react-router-dom';

const Auth_Context = createContext(null);

export const Auth_Provider = ({ children }) =>
{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(
        () =>
        {
            const fetch_user_profile = async () =>
            {
                if(token)
                {
                    try
                    {
                        const data = await api_request("/api/users/profile", "GET", null, token);
                        setUser(data.user);
                    }
                    catch (error)
                    {
                        console.error("Session expired or invalid:", error);
                        setToken(null);
                        localStorage.removeItem("authToken");
                        setUser(null);
                    }
                }
                else
                {
                    setUser(null);
                    localStorage.removeItem("authToken");
                }
                setLoading(false);
            };

            fetch_user_profile();
        },
        [token, navigate]
    );

    const login = async (uid, password) =>
    {
        try
        {
            const data = await api_request("/api/auth/login", "POST", { uid, password });
            setToken(data.token);
            localStorage.setItem("authToken", data.token);
            const user_profile_data = await api_request("/api/users/profile", "GET", null, data.token);
            setUser(user_profile_data.user);
            return { success: true };
        }
        catch(error)
        {
            console.error("Login failed in AuthContext:", error);
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            throw error;
        }
    };

    const register = async (username, email, password) =>
    {
        try
        {
            const data = await api_request("/api/auth/register", "POST", { username, email, password });
            setToken(data.token);
            localStorage.setItem("authToken", data.token);
            const user_profile_data = await api_request("/api/users/profile", "GET", null, data.token);
            setUser(user_profile_data.user);
            return { success: true };
        }
        catch(error)
        {
            console.error("Registration failed in AuthContext:", error);
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            throw error;
        }
    };
    
    const logout = () =>
    {
        api_request("/api/auth/logout", "POST", null, token)
            .then(() =>
                {
                    console.log("Logout successful");
                    setToken(null);
                    localStorage.removeItem("authToken");
                    setUser(null);
                    navigate('/');
                }
            )
            .catch(err =>
                {
                    console.error("Logout failed:", err);
                    setToken(null);
                    localStorage.removeItem("authToken");
                    setUser(null);
                    navigate('/');
                }
            );
    };

    const value = { user, token, loading, login, register, logout };

    return <Auth_Context.Provider value={value}>{children}</Auth_Context.Provider>;
};

export default Auth_Context;

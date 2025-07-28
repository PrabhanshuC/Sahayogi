import React, { useState, useEffect, createContext } from "react";

import { api_request } from "../api";

const Auth_Context = createContext(null);

export const Auth_Provider = ({ children }) =>
{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));

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
                        localStorage.setItem("authToken", token);
                    }
                    catch (error)
                    {
                        console.error("Session expired or invalid:", error);

                        setToken(null);
                    }
                }
                else
                {
                    setUser(null);

                    localStorage.removeItem("authToken");
                }
            };
            fetch_user_profile();
        },
        [token]
    );

    const login = (newToken) => setToken(newToken);
    const logout = () =>
    {
        api_request("/api/auth/logout", "POST", null, token).catch(err => console.error("Logout failed:", err));

        setToken(null);
    };
    
    const value = { user, token, login, logout };

    return <Auth_Context.Provider value={value}>{children}</Auth_Context.Provider>;
};

export default Auth_Context;

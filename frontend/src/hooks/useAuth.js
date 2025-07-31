import { useContext } from "react";

import Auth_Context from "../context/Auth_Context";

export const useAuth = () =>
{
    const context = useContext(Auth_Context);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};

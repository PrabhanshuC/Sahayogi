import React from "react";

import "../styles/login.css"

import { Login_Form } from "../components/user/Login_Form";

export const Login_Page = () =>
{
    return (
        <main id="login">
            <Login_Form />
        </main>
    );
};

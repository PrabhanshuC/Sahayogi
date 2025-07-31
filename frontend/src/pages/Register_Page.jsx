import React from "react";

import "../styles/register.css";

import { Registration_Form } from "../components/user/Registration_Form";

export const Register_Page = () =>
{
    return (
        <main id="register">
            <Registration_Form />
        </main>
    );
};

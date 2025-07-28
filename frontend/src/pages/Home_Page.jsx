import React from "react";

import "../styles/home.css"

import { Banner } from "../components/home/Banner";
import { Features_Workspace } from "../components/home/Features_Workspace";
import { Features_Sharing } from "../components/home/Features_Sharing";
import { Features_Learning } from "../components/home/Features_Learning";

export const Home_Page = () =>
{
    return (
        <main id="home">
            <Banner />
            <Features_Workspace />
            <Features_Sharing />
            <Features_Learning />
        </main>
    );
};

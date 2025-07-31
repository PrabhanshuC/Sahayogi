import React from "react";

import "../styles/dashboard.css";

import { Workspace_Section } from "../components/dashboard/Workspace_Section";
import { Account_Section } from "../components/dashboard/Account_Section";
import { History_Section } from "../components/dashboard/History_Section";
import { Saved_Section } from "../components/dashboard/Saved_Section";

export const Dashboard_Page = () =>
{
    return (
        <main id="dashboard" className="page">
            <header className="page-title">
                <h1>Dashboard</h1>
            </header>
            <div className="page-body">
                <div className="page-section">
                    <Workspace_Section />
                </div>
                <div className="page-section sidebar">
                    <Account_Section />
                    <History_Section />
                    <Saved_Section />
                </div>
            </div>
        </main>
    );
};

import React from "react";

export const History_Section = () =>
{
    // This is a placeholder. Logic to fetch history would be added here.
    return (
        <article className="content">
            <header className="content-header">
                <h2>Recent History</h2>
            </header>
            <div className="content-body">
                <section className="content-section">
                    <header className="content-section-header">
                        <h3>Workspaces</h3>
                    </header>
                    <div className="content-section-body">
                        <a href="">Project A</a>
                        <a href="">Travel Plan</a>
                    </div>
                </section>
                <section className="content-section">
                    <header className="content-section-header">
                        <h3>Guides</h3>
                    </header>
                    <div className="content-section-body">
                        <a href="">Full Stack Development using MERN</a>
                        <a href="">Game Development using C++</a>
                    </div>
                </section>
                <section className="content-section">
                    <header className="content-section-header">
                        <h3>Resources</h3>
                    </header>
                    <div className="content-section-body">
                        <a href="">Viewed: React Hooks Guide</a>
                        <a href="">Edited: My Project Workspace</a>
                        <a href="">Viewed: Node.js Performance Tips</a>
                    </div>
                </section>
            </div>
        </article>
    );
};

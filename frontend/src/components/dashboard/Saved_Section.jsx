import React from "react";

export const Saved_Section = () =>
{
    // This is a placeholder. Logic to fetch saved resources would be added here.
    return (
        <article className="content">
            <header className="content-header">
                <h2>Saved Items</h2>
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
                        <a href="">Advanced CSS Techniques</a>
                        <a href="">Docker for Beginners</a>
                    </div>
                </section>
            </div>
        </article>
    );
};

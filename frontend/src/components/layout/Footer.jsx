import React from "react";
import { Link } from "react-router-dom";

export const Footer = () =>
{
    return (
        <footer className="page-footer">
            <div className="footer-section"></div>
            <div className="footer-section">
                <h3>Links</h3>
                <nav>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/guides">Guides</Link>
                        <Link to="/pathways">Pathways</Link>
                    </div>
                    <div>
                        <Link to="/terms">Terms and conditions</Link>
                        <Link to="/privacy">Privacy policy</Link>
                    </div>
                </nav>
            </div>
            <div className="footer-section">
                <h3>Contacts</h3>
                <address>
                    <div><p>Email: <a href="mailto:prabhanshuchaturvedi0@gmail.com">prabhanshuchaturvedi0@gmail.com</a></p></div>
                    <div><p>Phone: <a href="tel:+919407123426">+91 9407 1234 26</a></p></div>
                </address>
            </div>
        </footer>
    );
};

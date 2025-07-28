import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth_Provider } from './context/Auth_Context';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home_Page } from './pages/Home_Page';
import { Login_Page } from './pages/Login_Page';
import { Register_Page } from './pages/Register_Page';
import { Account_Page } from './pages/Account_Page';
import { Dashboard_Page } from './pages/Dashboard_Page';
import { Workspace_Page } from './pages/Workspace_Page';
import { Admin_Dashboard_Page } from './pages/Admin_Dashboard_Page';
import { Protected_Route } from './components/auth/Protected_Route';

export const App = () => {
    return (
        <Auth_Provider>
            <BrowserRouter>
                <div className="app-container">
                    <Header />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home_Page />} />
                        <Route path="/login" element={<Login_Page />} />
                        <Route path="/register" element={<Register_Page />} />

                        {/* Protected User Routes */}
                        <Route path="/account" element={<Protected_Route><Account_Page /></Protected_Route>} />
                        <Route path="/dashboard" element={<Protected_Route><Dashboard_Page /></Protected_Route>} />
                        <Route path="/workspaces/:id" element={<Protected_Route><Workspace_Page /></Protected_Route>} />
                        
                        {/* Protected Admin Routes */}
                        <Route path="/admin/dashboard" element={
                            <Protected_Route required_role="admin">
                                <Admin_Dashboard_Page />
                            </Protected_Route>
                        } />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </Auth_Provider>
    );
}

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';

export const Login_Form = () =>
{
    const [uid, set_uid] = useState("");
    const [password, set_password] = useState("");
    const [loading, set_loading] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handle_login = async (e) =>
    {
        e.preventDefault();
        set_loading(true);
        try
        {
            await login(uid, password);
            set_snackbar_message('Login successful!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            navigate('/dashboard');
        }
        catch(error)
        {
            set_snackbar_message(error.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_loading(false);
        }
    };

    const handle_close_snackbar = () =>
    {
        set_open_snackbar(false);
    };

    return (
        <Box 
            component="form" 
            onSubmit={handle_login} 
            noValidate 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
            }}
        >
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                Login
            </Typography>
            <TextField
                required
                fullWidth
                id="uid"
                label="Username or Email Address"
                name="uid"
                autoComplete="username email"
                autoFocus
                value={ uid }
                onChange={ (e) => set_uid(e.target.value) }
            />
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ password }
                onChange={(e) => set_password(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Typography variant="body2" align="center">
                New to our platform? Create an account <Link to="/register" sx={{ color: 'text.primary' }}>here</Link>
            </Typography>
            <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                    {snackbar_message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

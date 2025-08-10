import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
// import { api_request } from '../../api';

export const Registration_Form = () =>
{
    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, set_username] = useState('');
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');
    const [confirm_password, set_confirm_password] = useState('');
    const [loading, set_loading] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    const handle_submit = async (event) =>
    {
        event.preventDefault();

        if (password !== confirm_password)
        {
            set_snackbar_message('Passwords do not match.');
            set_snackbar_severity('error');
            set_open_snackbar(true);
            return;
        }

        set_loading(true);
        try
        {
            // const data = await api_request('/api/auth/register', 'POST', { username, email, password });
            // register(data.token);
            register(username, email, password);
            set_snackbar_message('Registration successful!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            navigate('/dashboard');
        }
        catch (err)
        {
            set_snackbar_message(err.message);
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
            onSubmit={handle_submit} 
            noValidate 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
            }}
        >
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                Register
            </Typography>
            <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => set_username(e.target.value)}
            />
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => set_email(e.target.value)}
            />
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
            />
            <TextField
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="new-password"
                value={confirm_password}
                onChange={(e) => set_confirm_password(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading ? true : false}
                sx={{ mt: 3, mb: 2 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Typography variant="body2" align="center">
                Have an account? Login <Link to="/login" sx={{ color: 'text.primary' }}>here</Link>
            </Typography>
            <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                    {snackbar_message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

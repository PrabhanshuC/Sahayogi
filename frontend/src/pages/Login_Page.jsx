import React from 'react';
import { Container, Paper } from '@mui/material';

import { Login_Form } from '../components/auth/Login_Form';

const Login_Page = () =>
{
    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mt: 5, borderRadius: 2 }}>
                <Login_Form />
            </Paper>
        </Container>
    );
};

export default Login_Page;

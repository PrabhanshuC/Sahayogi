import React from 'react';
import { Container, Paper } from '@mui/material';

import { Registration_Form } from '../components/auth/Registration_Form';

const Registration_Page = () =>
{
    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mt: 5, borderRadius: 2 }}>
                <Registration_Form />
            </Paper>
        </Container>
    );
};

export default Registration_Page;

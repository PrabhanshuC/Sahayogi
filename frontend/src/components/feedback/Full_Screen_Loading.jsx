import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Full_Screen_Loading = ({ message = "Loading..." }) =>
{
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            flexDirection="column"
            gap={2}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
            {message}
            </Typography>
        </Box>
    );
};

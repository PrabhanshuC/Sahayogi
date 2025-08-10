import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = ({ drawer_width_collapsed, drawer_width_expanded, sidebar_open, user }) =>
{
    return (
        <Box 
            component="footer" 
            sx={{ 
                py: 3, 
                px: 2, 
                backgroundColor: 'background.paper', // White background for footer
                boxShadow: 3,
                ml: { md: user ? (sidebar_open ? `${drawer_width_expanded}px` : `${drawer_width_collapsed}px`) : 0 },
                transition: (theme) => theme.transitions.create('margin-left', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                width: { md: user ? (sidebar_open ? `calc(100% - ${drawer_width_expanded}px)` : `calc(100% - ${drawer_width_collapsed}px)`) : '100%' },
            }}
        >
            <Typography variant="body2" color="text.secondary" align="center">
                {'© '}
                {new Date().getFullYear()}
                {' Sahayogi. All rights reserved.'}
            </Typography>
        </Box>
    );
};

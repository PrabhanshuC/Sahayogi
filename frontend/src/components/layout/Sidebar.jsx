import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Toolbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    Home as HomeIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ drawer_width_collapsed, drawer_width_expanded, sidebar_open }) => {
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    const nav_list_items = (
        <List>
            <ListItem 
                button 
                component={Link} 
                to="/"
                sx={{
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.grey[100],
                    },
                }}
            >
                <ListItemIcon sx={{ color: 'text.primary' }}><HomeIcon /></ListItemIcon>
                {sidebar_open && <ListItemText primary="Home" sx={{ color: 'text.primary' }} />}
            </ListItem>
            {user ? (
                <>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/dashboard"
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><PersonIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/create-article"
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><AddIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Create Article" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/account-management"
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><SettingsIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Account Management" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                    <Divider sx={{ borderColor: (theme) => theme.palette.grey[300] }} />
                    <ListItem 
                        button 
                        onClick={logout}
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><LogoutIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Logout" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                </>
            ) : (
                <>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/login"
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><LoginIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Login" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/register"
                        sx={{
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'text.primary' }}><HowToRegIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Register" sx={{ color: 'text.primary' }} />}
                    </ListItem>
                </>
            )}
        </List>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sidebar_open ? drawer_width_expanded : drawer_width_collapsed,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: sidebar_open ? drawer_width_expanded : drawer_width_collapsed,
                    boxSizing: 'border-box',
                    transition: (theme) => theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                    display: { xs: 'none', md: 'block' },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderRadius: 0,
                },
            }}
            open={sidebar_open}
        >
            <Toolbar />
            <Divider sx={{ borderColor: (theme) => theme.palette.grey[300] }} />
            {nav_list_items}
        </Drawer>
    );
};

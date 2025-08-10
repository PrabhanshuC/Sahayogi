import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    TextField,
    InputAdornment
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
    Logout as LogoutIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Menu as MenuIcon,
    Home as HomeIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon,
    Search as SearchIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';

export const Header = ({ drawer_width_collapsed, drawer_width_expanded, sidebar_open, toggle_sidebar }) =>
{
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobile_drawer_open, set_mobile_drawer_open] = useState(false);
    const [header_search_query, set_header_search_query] = useState('');

    const toggle_mobile_drawer = (open) => (event) =>
    {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        set_mobile_drawer_open(open);
    };

    const handle_header_search_submit = () => {
        if (header_search_query.trim()) {
            navigate(`/?q=${encodeURIComponent(header_search_query.trim())}`);
            set_header_search_query('');
        } else {
            navigate('/');
        }
    };

    const mobile_nav_list_items = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggle_mobile_drawer(false)}
            onKeyDown={toggle_mobile_drawer(false)}
        >
            <List>
                {/* Home button always present at the top of the mobile drawer */}
                {user ? (
                    <>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon sx={{ color: 'text.primary' }}><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon sx={{ color: 'text.primary' }}><PersonIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/create-article">
                            <ListItemIcon sx={{ color: 'text.primary' }}><AddIcon /></ListItemIcon>
                            <ListItemText primary="Create Article" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/account-management">
                            <ListItemIcon sx={{ color: 'text.primary' }}><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Account Management" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={logout}>
                            <ListItemIcon sx={{ color: 'text.primary' }}><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: 'text.primary' }} />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon sx={{ color: 'text.primary' }}><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/login">
                            <ListItemIcon sx={{ color: 'text.primary' }}><LoginIcon /></ListItemIcon>
                            <ListItemText primary="Login" sx={{ color: 'text.primary' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/register">
                            <ListItemIcon sx={{ color: 'text.primary' }}><HowToRegIcon /></ListItemIcon>
                            <ListItemText primary="Register" sx={{ color: 'text.primary' }} />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                boxShadow: 3,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                width: '100%', 
                ml: 0, 
                backgroundColor: 'background.paper',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ 
                ml: { md: user ? (sidebar_open ? `${drawer_width_expanded}px` : `${drawer_width_collapsed}px`) : 0 },
                width: { md: user ? (sidebar_open ? `calc(100% - ${drawer_width_expanded}px)` : `calc(100% - ${drawer_width_collapsed}px)`) : '100%' },
                transition: (theme) => theme.transitions.create(['width', 'margin-left'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}>
                {/* Sidebar Toggle Button (Desktop Only) - Left-most side */}
                {user && (
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label="toggle sidebar"
                            onClick={toggle_sidebar}
                            edge="start"
                        >
                            {sidebar_open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>
                )}

                {/* Site Title - now a Typography component, not a full link */}
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> {/* Link wraps only the text */}
                        Sahayogi
                    </Link>
                </Typography>

                {/* Search Bar (Always visible) */}
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={header_search_query}
                    onChange={(e) => set_header_search_query(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handle_header_search_submit(); }}
                    sx={{ 
                        mr: { xs: 1, md: 2 },
                        width: { xs: '150px', sm: '200px', md: '300px' },
                        backgroundColor: (theme) => theme.palette.grey[100],
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                        '& .MuiInputBase-input::placeholder': { color: 'text.secondary' },
                        '& .MuiInputBase-input': { color: 'text.primary' },
                        '& .MuiInputLabel-root': { color: 'text.secondary' },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.primary' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Conditional Navigation Buttons / Mobile Hamburger */}
                {user ? (
                    // Mobile Hamburger for logged-in user (always shown on mobile)
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggle_mobile_drawer(true)}
                        >
                            <MenuIcon sx={{ color: 'text.primary' }} />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobile_drawer_open}
                            onClose={toggle_mobile_drawer(false)}
                        >
                            {mobile_nav_list_items}
                        </Drawer>
                    </Box>
                ) : (
                    // Desktop Links for visitors (Home, Login, Register) - Hidden on mobile
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                        <Button color="inherit" component={Link} to="/" sx={{ color: 'text.primary' }}>Home</Button>
                        <Button color="inherit" component={Link} to="/login" sx={{ color: 'text.primary' }}>Login</Button>
                        <Button color="inherit" component={Link} to="/register" sx={{ color: 'text.primary' }}>Register</Button>
                    </Box>
                )}

                {/* Mobile Hamburger for visitors (always shown on mobile) */}
                {!user && (
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggle_mobile_drawer(true)}
                        >
                            <MenuIcon sx={{ color: 'text.primary' }} />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobile_drawer_open}
                            onClose={toggle_mobile_drawer(false)}
                        >
                            {mobile_nav_list_items}
                        </Drawer>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

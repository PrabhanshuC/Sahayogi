import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Paper,
    TextField,
    FormControlLabel,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

export const Account_Management_Page = () =>
{
    const navigate = useNavigate();
    const { user, token, logout } = useAuth();
    
    const [email, set_email] = useState('');
    const [about, set_about] = useState('');
    const [github, set_github] = useState('');
    const [website, set_website] = useState('');
    const [new_password, set_new_password] = useState('');
    const [confirm_new_password, set_confirm_new_password] = useState('');

    const [loading_profile, set_loading_profile] = useState(true);
    const [updating_profile, set_updating_profile] = useState(false);
    const [deleting_account, set_deleting_account] = useState(false);

    const [delete_content, set_delete_content] = useState(false);
    const [open_delete_dialog, set_open_delete_dialog] = useState(false);

    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    useEffect(() => {
        const fetch_user_data = async () => {
            if (user && token) {
                set_loading_profile(true);
                try {
                    const data = await api_request('/api/users/profile', 'GET', null, token);
                    set_email(data.user.email || '');
                    set_about(data.user.about || '');
                    set_github(data.user.github || '');
                    set_website(data.user.website || '');
                } catch (err) {
                    set_snackbar_message("Failed to load profile data: " + err.message);
                    set_snackbar_severity('error');
                    set_open_snackbar(true);
                } finally {
                    set_loading_profile(false);
                }
            }
        };
        fetch_user_data();
    }, [user, token]);

    const handle_profile_update = async (event) =>
    {
        event.preventDefault();
        set_updating_profile(true);

        if (new_password && new_password !== confirm_new_password) {
            set_snackbar_message("New passwords do not match.");
            set_snackbar_severity('error');
            set_open_snackbar(true);
            set_updating_profile(false);
            return;
        }

        const update_data = {
            email,
            about,
            github,
            website,
        };

        if (new_password) {
            update_data.password = new_password;
        }

        try
        {
            await api_request('/api/users/profile', 'PUT', update_data, token);
            set_snackbar_message('Profile updated successfully!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            set_new_password('');
            set_confirm_new_password('');
        }
        catch (err)
        {
            set_snackbar_message(err.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_updating_profile(false);
        }
    };

    const handle_delete_account_request = async () =>
    {
        set_deleting_account(true);
        try
        {
            await api_request('/api/users/profile', 'DELETE', { delete_content }, token);
            set_snackbar_message('Account deletion request successful! You have been logged out.');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            setTimeout(() => {
                logout(); 
                navigate('/'); 
            }, 1500);
        }
        catch (err)
        {
            set_snackbar_message(err.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_deleting_account(false);
            set_open_delete_dialog(false);
        }
    };

    const handle_close_snackbar = (event, reason) =>
    {
        if (reason === 'clickaway') {
            return;
        }
        set_open_snackbar(false);
    };

    const handle_open_delete_dialog = () =>
    {
        set_open_delete_dialog(true);
    };

    const handle_close_delete_dialog = () =>
    {
        set_open_delete_dialog(false);
    };

    const handle_back = () => { // Back button handler
        navigate(-1);
    };

    if (loading_profile) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, minHeight: '600px', boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}>
                <Box sx={{ mb: 2 }}>
                    <Button variant="outlined" onClick={handle_back}>Back</Button> {/* Back button */}
                </Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    Account Management
                </Typography>

                <Box component="form" onSubmit={handle_profile_update} sx={{ mb: 5 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                        Update Profile
                    </Typography>
                    <TextField
                        fullWidth
                        label="Username"
                        value={user?.username || ''}
                        InputProps={{ readOnly: true }}
                        margin="normal"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        margin="normal"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="About"
                        value={about}
                        onChange={(e) => set_about(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="GitHub Profile URL"
                        value={github}
                        onChange={(e) => set_github(e.target.value)}
                        margin="normal"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Personal Website URL"
                        value={website}
                        onChange={(e) => set_website(e.target.value)}
                        margin="normal"
                        sx={{ mb: 4 }}
                    />

                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
                        Change Password
                    </Typography>
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        value={new_password}
                        onChange={(e) => set_new_password(e.target.value)}
                        margin="normal"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={confirm_new_password}
                        onChange={(e) => set_confirm_new_password(e.target.value)}
                        margin="normal"
                        sx={{ mb: 4 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={updating_profile}
                        startIcon={updating_profile ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Update Profile
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 3, color: 'error.main' }}>
                        Delete Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        You can request to delete your account. Please choose how your content should be handled:
                    </Typography>
                    <FormControlLabel
                        control={<Checkbox checked={delete_content} onChange={(e) => set_delete_content(e.target.checked)} />}
                        label="Permanently delete all my articles and content along with my account."
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
                        (If unchecked, your account will be deactivated, and your articles will remain, but their author will be anonymized.)
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handle_open_delete_dialog}
                        disabled={deleting_account}
                        startIcon={deleting_account ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Request Account Deletion
                    </Button>
                </Box>

                <Dialog
                    open={open_delete_dialog}
                    onClose={handle_close_delete_dialog}
                    aria-labelledby="delete-account-dialog-title"
                    aria-describedby="delete-account-dialog-description"
                >
                    <DialogTitle id="delete-account-dialog-title">{"Confirm Account Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-account-dialog-description">
                            Are you sure you want to proceed with account deletion?
                            {delete_content ? (
                                " This action will permanently delete your account and ALL your articles. This cannot be undone."
                            ) : (
                                " This action will deactivate your account, and your articles will be anonymized. You will be logged out."
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handle_close_delete_dialog}>Cancel</Button>
                        <Button onClick={handle_delete_account_request} color="error" autoFocus disabled={deleting_account}>
                            {deleting_account ? <CircularProgress size={20} color="inherit" /> : 'Confirm'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                    <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                        {snackbar_message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default Account_Management_Page;

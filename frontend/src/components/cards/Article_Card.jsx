import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box,
         Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
         Snackbar, Alert, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';

export const Article_Card = ({ article, is_dashboard_view = false, on_delete_success }) =>
{
    const { user, token } = useAuth();
    const is_author = user && article.author && article.author._id === user._id;

    const [open_delete_dialog, set_open_delete_dialog] = useState(false);
    const [deleting, set_deleting] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    const handle_delete_confirm_open = () => {
        set_open_delete_dialog(true);
    };

    const handle_delete_confirm_close = () => {
        set_open_delete_dialog(false);
    };

    const handle_delete_article = async () => {
        set_deleting(true);
        set_open_delete_dialog(false);
        try {
        await api_request(`/api/articles/${article._id}`, 'DELETE', null, token);
        set_snackbar_message("Article deleted successfully!");
        set_snackbar_severity('success');
        set_open_snackbar(true);
        on_delete_success(article._id);
        } catch (error) {
        console.error("Failed to delete article:", error);
        set_snackbar_message("Failed to delete article: " + error.message);
        set_snackbar_severity('error');
        set_open_snackbar(true);
        } finally {
        set_deleting(false);
        }
    };

    const handle_close_snackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        
        set_open_snackbar(false);
    };

    const get_excerpt = (markdown_content, char_limit = 100) => {
        if (!markdown_content) return 'No content preview available.';

        let plain_text = markdown_content
            .replace(/#{1,6}\s/g, '')
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/>\s/g, '')
            .replace(/-\s/g, '');

        plain_text = plain_text.trim();
        if (plain_text.length > char_limit) {
            return plain_text.substring(0, char_limit) + '...';
        }
        return plain_text;
    };

    return (
        <Card 
        raised 
        sx={{ 
            height: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)`,
            transition: 'box-shadow 0.2s', 
            '&:hover': { boxShadow: `0px 5px 5px -3px rgba(102, 56, 0, 0.3), 0px 8px 10px 1px rgba(102, 56, 0, 0.2), 0px 3px 14px 2px rgba(102, 56, 0, 0.18)` }, 
            width: '100%', 
            position: 'relative' 
        }}
        >
        {/* Link is now specifically on the Typography component */}

        <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* Title as a clickable link */}
            <Typography 
            gutterBottom 
            variant="h6" 
            component={Link} // Make Typography a Link
            to={`/articles/${article._id}`} // Link to article details
            sx={{ 
                fontWeight: 'bold', 
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1, 
                WebkitBoxOrient: 'vertical',
                minHeight: '1.5em', 
                zIndex: 2, // Ensure it's above other elements if any
                color: 'text.primary', // Use theme text color
                textDecoration: 'none', // Remove underline by default
                '&:hover': {
                textDecoration: 'underline', // Add underline on hover
                }
            }}
            aria-label={`Read ${article.title}`}
            >
            {article.title}
            </Typography>
            
            <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
                flexGrow: 1, 
                lineHeight: 1.5,
                minHeight: '3em', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                display: '-webkit-box',
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'pre-wrap',
                zIndex: 2 
            }}
            >
            {get_excerpt(article.content, 100)}
            </Typography>

            {article.author && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', zIndex: 2 }}>
                By <Link to={`/users/${article.author._id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>{article.author.username}</Link> 
                {' on '} {new Date(article.createdAt).toLocaleDateString()}
            </Typography>
            )}

            {/* Display Tags */}
            {article.tags && article.tags.length > 0 && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5, zIndex: 2 }}>
                    {article.tags.slice(0, 3).map((tag, index) => ( // Limit to 3 tags for brevity
                        <Chip key={index} label={tag} size="small" variant="outlined" color="primary" />
                    ))}
                    {article.tags.length > 3 && (
                        <Chip label={`+${article.tags.length - 3}`} size="small" variant="outlined" color="primary" />
                    )}
                </Box>
            )}
        </CardContent>
        <CardActions sx={{ px: 2, pb: 1.5, justifyContent: 'flex-end', zIndex: 2 }}>
            {is_dashboard_view && is_author && (
            <Box>
                <Button size="small" component={Link} to={`/edit-article/${article._id}`} variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" variant="outlined" onClick={handle_delete_confirm_open}>Delete</Button>
            </Box>
            )}
        </CardActions>

        <Dialog
            open={open_delete_dialog}
            onClose={handle_delete_confirm_close}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="delete-dialog-description">
                Are you sure you want to permanently delete this article? This action cannot be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handle_delete_confirm_close}>Cancel</Button>
            <Button onClick={handle_delete_article} color="error" autoFocus disabled={deleting}>
                {deleting ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
            </Button>
            </DialogActions>
        </Dialog>

        <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
            <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
            {snackbar_message}
            </Alert>
        </Snackbar>
        </Card>
    );
};

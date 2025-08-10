import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert, 
  Container, 
  Paper,
  Snackbar, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loading } from '../components/feedback/Loading';

const Article_Details_Page = () =>
{
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const { user, token } = useAuth();
    
    const [article, set_article] = useState(null);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);
    const [deleting, set_deleting] = useState(false);
    const [open_delete_dialog, set_open_delete_dialog] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    const is_author = user && article && article.author && article.author._id === user._id;

    useEffect(() =>
    {
        const fetch_article = async () =>
        {
        set_loading(true);
        set_error(null);
        try
        {
            const data = await api_request(`/api/articles/${id}`);
            set_article(data);
        }
        catch (err)
        {
            set_error(err.message);
            set_article(null);
        }
        finally
        {
            set_loading(false);
        }
        };
        fetch_article();
    }, [id]);

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
        setTimeout(() => navigate('/dashboard'), 1500);
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
        if (reason === 'clickaway') {
        return;
        }
        set_open_snackbar(false);
    };

    const handle_back = () => { // Back button handler
        navigate(-1);
    };

    return (
        <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="outlined" onClick={handle_back}>Back</Button> {/* Changed to onClick={handle_back} */}
            {is_author && (
                <Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to={`/edit-article/${article._id}`} 
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={handle_delete_confirm_open} 
                    disabled={deleting}
                >
                    {deleting ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                </Button>
                </Box>
            )}
            </Box>

            {loading ? (
            <Loading message="Loading article..." />
            ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            ) : !article ? (
            <Alert severity="warning" sx={{ mt: 2 }}>
                Article not found. It might have been deleted or the URL is incorrect.
            </Alert>
            ) : (
            <>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>{article.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                By <Link to={`/users/${article.author._id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>{article.author.username}</Link> | {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
                <Box sx={{ 
                mt: 3, 
                lineHeight: 1.8, 
                fontSize: { xs: '0.95rem', md: '1rem' },
                '& p': { margin: '1em 0' }, 
                '& ul, & ol': { margin: '1em 0', paddingLeft: '25px' },
                '& h1, & h2, & h3, & h4, & h5, & h6': { mt: '1.5em', mb: '0.5em', fontWeight: 'bold' },
                '& pre': { backgroundColor: (theme) => theme.palette.grey[100], p: 1.5, borderRadius: 1, overflowX: 'auto' },
                '& code': { fontFamily: 'monospace', fontSize: '0.9em' },
                '& blockquote': { borderLeft: '4px solid', borderColor: (theme) => theme.palette.primary.main, pl: 2, fontStyle: 'italic', color: (theme) => theme.palette.text.secondary }
                }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {article.content}
                </ReactMarkdown>
                </Box>
            </>
            )}
        </Paper>

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
        </Container>
    );
};

export default Article_Details_Page;

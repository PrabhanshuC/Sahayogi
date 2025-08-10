import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Alert,
    Paper,
    Button,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';
import { Article_Card } from '../components/cards/Article_Card';
import { Loading } from '../components/feedback/Loading';

const Dashboard_Page = () =>
{
    const { user, token } = useAuth();
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    const fetch_user_articles = async () =>
    {
        if (user && token)
        {
            set_loading(true);
            set_error(null);
            try
            {
                const data = await api_request(`/api/users/${user._id}/articles`, 'GET', null, token);
                set_articles(data);
            }
            catch (err)
            {
                if (err.message.includes("404")) {
                    set_articles([]);
                } else {
                    set_error(err.message);
                }
            }
            finally
            {
                set_loading(false);
            }
        }
    };

    useEffect(() =>
    {
        fetch_user_articles();
    }, [user, token]);

    const handle_article_delete_success = (deleted_article_id) => {
        set_articles(prevArticles => prevArticles.filter(article => article._id !== deleted_article_id));
    };

    if (loading)
    {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }
    if (error)
    {
        return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, minHeight: '500px', boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2.5rem', md: '3rem' }, color: 'text.primary' }}>
                    Welcome, {user?.username || 'User'}!
                </Typography>
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 'medium', color: 'text.primary' }}>
                    My Articles
                </Typography>
                
                {loading ? (
                    <Loading message="Loading your articles..." />
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                ) : (
                    <Stack spacing={2}>
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <Article_Card 
                                    key={article._id}
                                    article={article} 
                                    is_dashboard_view={true} 
                                    on_delete_success={handle_article_delete_success} 
                                />
                            ))
                        ) : (
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                minHeight: '300px', 
                                py: 4, 
                                textAlign: 'center',
                                backgroundColor: (theme) => theme.palette.grey[50], 
                                borderRadius: 1,
                                border: '1px dashed',
                                borderColor: (theme) => theme.palette.grey[300],
                                color: (theme) => theme.palette.text.secondary
                            }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    It looks like you haven't created any articles yet.
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Start sharing your knowledge!
                                </Typography>
                                <Button variant="contained" component={Link} to="/create-article" sx={{ mt: 2 }}>
                                    Create Your First Article!
                                </Button>
                            </Box>
                        )}
                    </Stack>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard_Page;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Typography, CircularProgress, Alert, Container, Paper, Divider, Grid, Stack, Button } from '@mui/material'; // Import Button
import { GitHub as GitHubIcon, Public as PublicIcon } from '@mui/icons-material';

import { api_request } from '../api';
import { Article_Card } from '../components/cards/Article_Card';
import { Loading } from '../components/feedback/Loading';

const User_Profile_Page = () =>
{
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [profile, set_profile] = useState(null);
  const [articles, set_articles] = useState([]);
  const [loading_profile, set_loading_profile] = useState(true);
  const [loading_articles, set_loading_articles] = useState(true);
  const [error_profile, set_error_profile] = useState(null);
  const [error_articles, set_error_articles] = useState(null);

  useEffect(() => {
    const fetch_user_profile = async () => {
      set_loading_profile(true);
      set_error_profile(null);
      try {
        const data = await api_request(`/api/users/${id}`, 'GET');
        set_profile(data.user);
      } catch (err) {
        set_error_profile(err.message);
      } finally {
        set_loading_profile(false);
      }
    };
    fetch_user_profile();
  }, [id]);

  useEffect(() => {
    const fetch_user_articles = async () => {
      set_loading_articles(true);
      set_error_articles(null);
      try {
        const data = await api_request(`/api/users/${id}/public-articles`, 'GET');
        set_articles(data);
      } catch (err) {
        if (err.message.includes("404")) {
          set_articles([]);
        } else {
          set_error_articles(err.message);
        }
      } finally {
        set_loading_articles(false);
      }
    };
    fetch_user_articles();
  }, [id]);

  const handle_back = () => {
    navigate(-1); // Go back to the previous page in history
  };

  if (loading_profile || loading_articles) {
    return <Loading message="Loading profile..." />;
  }
  if (error_profile) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error_profile}</Alert>;
  }
  if (!profile) {
    return <Alert severity="warning" sx={{ mt: 2 }}>User profile not found.</Alert>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}>
        <Box sx={{ mb: 3 }}>
            <Button variant="outlined" onClick={handle_back}>Back</Button> {/* Back button */}
        </Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
          {profile.username}'s Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom color="text.primary">About</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {profile.about || 'No information provided.'}
          </Typography>
          {profile.github && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                <Link href={profile.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  GitHub Profile
                </Link>
              </Typography>
            </Box>
          )}
          {profile.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                <Link href={profile.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Personal Website
                </Link>
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
          Articles by {profile.username}
        </Typography>
        {error_articles ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error_articles}</Alert>
        ) : (
          <Stack spacing={2}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <Article_Card key={article._id} article={article} />
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  This user hasn't published any articles yet.
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default User_Profile_Page;
